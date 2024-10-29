const CartModel = require("../models/cart.model.js");

class CartManager {
    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({ products: [] });
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear el nuevo carrito");
        }
    }

    async getCarritoById(cartId) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) {
                console.log("No existe ese carrito con el id");
                return null;
            }
            return carrito;
        } catch (error) {
            console.log("Error al traer el carrito", error);
        }
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(cartId);
            const existeProducto = carrito.products.find(item => item.product.toString() === productId);

            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({ product: productId, quantity });
            }

            carrito.markModified("products");
            await carrito.save();
            return carrito;
        } catch (error) {
            console.log("Error al agregar un producto", error);
        }
    }

    async eliminarProductoDelCarrito(cartId, productId) {
        try {
            const carrito = await this.getCarritoById(cartId);
            if (!carrito) {
                console.log("Carrito no encontrado");
                return null;
            }
    
            carrito.products = carrito.products.filter(item => item.product._id.toString() !== productId);
            
            await carrito.save();
            console.log(carrito)
            return carrito;
        } catch (error) {
            console.log("Error al eliminar el producto del carrito", error);
        }
    }
        
    
    

    async actualizarCarrito(cartId, productos) {
        try {
            const carrito = await this.getCarritoById(cartId);
            if (!carrito) {
                throw new Error("Carrito no encontrado");
            }

            carrito.products = productos;
            carrito.markModified("products");
            await carrito.save();
            return carrito;
        } catch (error) {
            console.log("Error al actualizar el carrito", error);
            throw error;
        }
    }

    async actualizarCantidadProducto(cartId, productId, quantity) {
        try {
            const carrito = await this.getCarritoById(cartId);
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
            console.log("Error al actualizar la cantidad del producto", error);
            throw error;
        }
    }
    

    async eliminarTodosLosProductos(cartId) {
        try {
            const carrito = await this.getCarritoById(cartId);
            if (!carrito) {
                throw new Error("Carrito no encontrado");
            }

            carrito.products = []; 
            await carrito.save();
            return carrito;
        } catch (error) {
            console.log("Error al vaciar el carrito", error);
            throw error;
        }
    }
}

module.exports = CartManager;
