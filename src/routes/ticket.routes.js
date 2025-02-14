const express = require('express');
const ticketController = require('../controllers/ticket.controller.js');
const auth = require('../middlewares/auth.middleware.js');
const router = express.Router();

router.post('/:cid/purchase', auth('user'), ticketController.purchase);

module.exports = router;
