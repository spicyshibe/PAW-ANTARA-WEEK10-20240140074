const express = require('express');
const router = express.Router();
const validateChatInput = require('../middlewares/validateChatInput.middleware');
const { chat, getHistory, clearHistory } = require('../controllers/chat.controller');

// Endpoint public chat (user kirim pesan & opsional simpan jika consent)
router.post('/', validateChatInput, chat);

// Endpoint read riwayat percakapan
router.get('/history', getHistory);
router.get('/', getHistory);

// Endpoint delete riwayat percakapan (opsional)
router.delete('/history', clearHistory);

module.exports = router;
