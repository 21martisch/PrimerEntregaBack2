// const CartRepository = require('../repositories/cart.repository');
// const ProductRepository = require('../repositories/product.repository');
// const TicketRepository = require('../repositories/ticket.repository');
// const nodemailer = require('nodemailer');

// class CartService {
//     constructor() {
//         this.cartRepository = new CartRepository();
//         this.productRepository = new ProductRepository();
//         this.ticketRepository = new TicketRepository();
//     }

//     async createCart() {
//         return await this.cartRepository.createCart();
//     }

//     async getCartById(cartId) {
//         return await this.cartRepository.getCartById(cartId);
//     }

//     async addProductToCart(cartId, productId, quantity) {
//         const product = await this.productRepository.getProductById(productId);
//         if (!product) {
//             throw new Error('Producto no encontrado');
//         }

//         if (product.stock < quantity) {
//             throw new Error('Stock insuficiente');
//         }

//         await this.cartRepository.addProductToCart(cartId, productId, quantity);
//         return await this.cartRepository.getCartById(cartId);
//     }

//     async removeProductFromCart(cartId, productId) {
//         await this.cartRepository.removeProductFromCart(cartId, productId);
//         return await this.cartRepository.getCartById(cartId);
//     }

//     async purchaseCart(cartId, userEmail) {
//         const cart = await this.cartRepository.getCartById(cartId);
//         if (!cart) {
//             throw new Error('Carrito no encontrado');
//         }

//         let totalAmount = 0;

//         for (const item of cart.products) {
//             const product = await this.productRepository.getProductById(item.product._id);

//             if (product.stock < item.quantity) {
//                 throw new Error(`Stock insuficiente para ${product.title}`);
//             }

//             product.stock -= item.quantity;
//             await this.productRepository.updateProduct(product._id, product);
//             totalAmount += product.price * item.quantity;
//         }

//         const ticket = await this.ticketRepository.createTicket({
//             amount: totalAmount,
//             purchaser: userEmail
//         });

//         await this.cartRepository.clearCart(cartId);

//         await this.sendPurchaseEmail(userEmail, ticket);

//         return ticket;
//     }

//     async sendPurchaseEmail(to, ticket) {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: to,
//             subject: 'Compra realizada con éxito',
//             html: `<h1>Gracias por tu compra</h1>
//                    <p>Tu ticket:</p>
//                    <pre>${JSON.stringify(ticket, null, 2)}</pre>`
//         };

//         await transporter.sendMail(mailOptions);
//     }
// }

// module.exports = new CartService();
const CartRepository = require("../repositories/cart.repository.js");

class CartService {
    static async createCart(userId) {
        return await CartRepository.createCart(userId);
    }

    static async getCartById(cartId) {
        return await CartRepository.getCartById(cartId);
    }

    static async addProductToCart(cartId, productId, quantity, userId) {
        return await CartRepository.addProductToCart(cartId, productId, quantity, userId);
    }

    static async removeProductFromCart(cartId, productId) {
        return await CartRepository.removeProductFromCart(cartId, productId);
    }

    static async updateCart(cartId, products) {
        return await CartRepository.updateCart(cartId, products);
    }

    static async updateProductQuantity(cartId, productId, quantity) {
        return await CartRepository.updateProductQuantity(cartId, productId, quantity);
    }

    static async clearCart(cartId) {
        return await CartRepository.clearCart(cartId);
    }
}

module.exports = CartService;
