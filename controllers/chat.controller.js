const { askGemini } = require('../services/gemini.service');
const { History } = require('../models');
const sendResponse = require('../utils/response');

/**
 * Controller untuk menangani kirim pesan chat ke AI
 * Menyimpan ke database HANYA JIKA user menyetujui (consent = true)
 */
async function chat(req, res) {
  try {
    const { message, consent, sessionId } = req.body;

    const reply = await askGemini(message);

    // Evaluasi consent pengguna: hanya simpan jika consent bernilai true (boolean/string 'true')
    const isConsentGranted = consent === true || consent === 'true' || consent === 1 || consent === '1';

    let historyRecord = null;

    if (isConsentGranted) {
      historyRecord = await History.create({
        userMessage: message,
        aiResponse: reply,
        consent: true,
        sessionId: sessionId || null,
      });
    }

    return sendResponse(res, {
      code: 200,
      success: true,
      message: 'Berhasil dapat balasan',
      data: {
        reply,
        saved: isConsentGranted,
        history: historyRecord,
      },
    });
  } catch (err) {
    console.error('Gemini error:', err.message);
    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal menghubungi AI, coba lagi nanti',
    });
  }
}

/**
 * Controller untuk mengambil riwayat percakapan dari database
 */
async function getHistory(req, res) {
  try {
    const { sessionId } = req.query;
    const whereCondition = {};
    if (sessionId) {
      whereCondition.sessionId = sessionId;
    }

    const histories = await History.findAll({
      where: whereCondition,
      order: [['createdAt', 'ASC']],
    });

    return sendResponse(res, {
      code: 200,
      success: true,
      message: 'Berhasil mengambil riwayat percakapan',
      data: histories,
    });
  } catch (err) {
    console.error('Error fetching chat history:', err.message);
    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal mengambil riwayat percakapan',
    });
  }
}

/**
 * Controller opsional untuk mengosongkan riwayat percakapan dari database
 */
async function clearHistory(req, res) {
  try {
    const { sessionId } = req.query;
    const whereCondition = {};
    if (sessionId) {
      whereCondition.sessionId = sessionId;
    }

    await History.destroy({ where: whereCondition });

    return sendResponse(res, {
      code: 200,
      success: true,
      message: 'Riwayat percakapan berhasil dibersihkan',
      data: null,
    });
  } catch (err) {
    console.error('Error clearing chat history:', err.message);
    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal membersihkan riwayat percakapan',
    });
  }
}

module.exports = {
  chat,
  getHistory,
  clearHistory,
};
