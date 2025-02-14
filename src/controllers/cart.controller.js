const CartService = require("../services/cart.services.js");
const TicketService = require("../services/ticket.services.js");

class CartController {
    static async createCart(req, res) {
        try {
            const userId = req.user._id;
            const newCart = await CartService.createCart(userId);
            res.json(newCart);
        } catch (error) {
            console.error("Error al crear un nuevo carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async getCartById(req, res) {
        const cartId = req.params.cid;
        try {
            const cart = await CartService.getCartById(cartId);
            if (!cart) {
                return res.status(404).json({ error: "Carrito no encontrado" });
            }
            res.json(cart.products);
        } catch (error) {
            console.error("Error al obtener el carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async addProductToCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1;
        const userId = req.user._id;
    
        try {
            const updatedCart = await CartService.addProductToCart(cartId, productId, quantity, userId);
            res.json(updatedCart.products);
        } catch (error) {
            console.error("Error al agregar producto al carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async removeProductFromCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        try {
            const updatedCart = await CartService.removeProductFromCart(cartId, productId);
            res.json(updatedCart.products);
        } catch (error) {
            console.error("Error al eliminar producto del carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async updateCart(req, res) {
        const cartId = req.params.cid;
        const products = req.body.products;

        try {
            const updatedCart = await CartService.updateCart(cartId, products);
            res.json(updatedCart.products);
        } catch (error) {
            console.error("Error al actualizar el carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async updateProductQuantity(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;

        try {
            const updatedCart = await CartService.updateProductQuantity(cartId, productId, quantity);
            res.json(updatedCart.products);
        } catch (error) {
            console.error("Error al actualizar cantidad del producto", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async clearCart(req, res) {
        const cartId = req.params.cid;

        try {
            const clearedCart = await CartService.clearCart(cartId);
            res.json(clearedCart);
        } catch (error) {
            console.error("Error al eliminar todos los productos del carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async purchase(req, res) {
        try {
            const cartId = req.params.cid;
            const result = await TicketService.createTicket(cartId);

            res.status(200).json({
                message: 'Compra realizada con éxito',
                productsWithoutStock: result.productsWithoutStock
            });
        } catch (error) {
            console.error('Error en la compra:', error);
            res.status(500).json({ message: 'Error al realizar la compra' });
        }
    }
}

module.exports = CartController;

