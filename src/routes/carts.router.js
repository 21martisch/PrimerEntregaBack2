// src/routes/cart.routes.js
const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller.js");
const Cart = require('../dao/models/cart.model.js');
const TicketService = require('../services/ticket.services.js');
const auth = require("../middlewares/auth.middleware.js");

router.post("/", auth('user'), CartController.createCart);
router.get("/:cid", CartController.getCartById);
router.post("/:cid/product/:pid", auth('user'), CartController.addProductToCart);
router.delete("/:cid/product/:pid", CartController.removeProductFromCart);
router.put("/:cid", CartController.updateCart);
router.put("/:cid/products/:pid", CartController.updateProductQuantity);
router.delete("/:cid", CartController.clearCart);
router.post('/:cid/purchase', auth('user'), CartController.purchase);

module.exports = router;


