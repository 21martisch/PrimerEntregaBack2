const CartModel = require("../dao/models/cart.model.js");

class CartRepository {
    async createCart(userId) {
        try {
            const newCart = new CartModel({ 
                products: [],
                user: userId  
            });
            await newCart.save();
            return newCart;
        } catch (error) {
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            return await CartModel.findById(cartId)
                .populate({
                    path: 'products.product',
                    select: 'title price stock' 
                });
        } catch (error) {
            throw error;
        }
    }
    

    async updateCart(cartId, productos) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) {
                throw new Error("Carrito no encontrado");
            }

            carrito.products = productos;
            carrito.markModified("products");
            await carrito.save();
            return carrito;
        } catch (error) {
            throw error;
        }
    }
    

    async deleteCart(cartId) {
        try {
            return await CartModel.findByIdAndDelete(cartId);
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity, userId) {
        try {
            const cart = await CartModel.findById(cartId)
                .populate({
                    path: 'products.product',
                    select: 'title price stock'
                });
    
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
    
            if (!cart.user) {
                cart.user = userId;
            }
    
            const productIndex = cart.products.findIndex(p => p.product._id.toString() === productId);
    
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
    
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
    
    
    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
    
            cart.products = cart.products.filter(p => p.product.toString() !== productId);
    
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) {
                throw new Error("Carrito no encontrado");
            }
    
            const existeProducto = carrito.products.find(item => item.product._id.toString() === productId);
            if (existeProducto) {
                existeProducto.quantity = quantity;
            } else {
                throw new Error("El producto no existe en el carrito");
            }
    
            carrito.markModified("products"); 
            await carrito.save(); 
            return carrito;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CartRepository();



