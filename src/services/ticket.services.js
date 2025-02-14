const Cart = require("../dao/models/cart.model.js");
const Product = require("../dao/models/product.model.js");
const Ticket = require("../dao/models/ticket.model.js");

class TicketService {
    async createTicket(cartId) {
        const cart = await Cart.findById(cartId)
            .populate({
                path: 'products.product',
                select: 'title price stock'
            })
            .populate({ 
                path: 'user',  
                model: 'User', 
                select: 'email'  
            });
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
    

        let totalAmount = 0;
        const productsToBuy = [];
        const productsWithoutStock = [];
    
        for (let item of cart.products) {
            const product = item.product;
            const quantity = item.quantity;
    
    
            if (product.stock >= quantity) {
                product.stock -= quantity;
                await product.save();
    
                totalAmount += product.price * quantity;
                productsToBuy.push({
                    title: product.title,
                    quantity: quantity,
                    price: product.price
                });
            } else {
                productsWithoutStock.push(product._id.toString());
            }
        }
    
        if (productsToBuy.length === 0) {
            throw new Error("No hay productos con stock suficiente");
        }
    
        const newTicket = new Ticket({
            code: Math.random().toString(36).substring(2, 9).toUpperCase(),
            purchase_datetime: new Date(),
            amount: totalAmount,
            purchaser: cart.user.email, 
        });
        await newTicket.save();
    
        cart.products = cart.products.filter(item => 
            productsWithoutStock.includes(item.product._id.toString())
        );
        await cart.save();
    
        return { ticket: newTicket, productsWithoutStock };
    }
    
}

module.exports = new TicketService();

