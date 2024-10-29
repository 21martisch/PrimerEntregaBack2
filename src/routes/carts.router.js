const express = require("express");
const router = express.Router();
const CartManager = require("../managers/cart.manager.js");
const cartManager = new CartManager();
const CartModel = require("../models/cart.model.js");

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        console.error("Error al crear un nuevo carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await CartModel.findById(cartId);
        if (!carrito) {
            console.log("No existe ese carrito con el id");
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        return res.json(carrito.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.delete("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const carritoActualizado = await cartManager.eliminarProductoDelCarrito(cartId, productId);
        res.json(carritoActualizado.products );
    } catch (error) {
        console.error("Error al eliminar producto del carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.put("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    const productos = req.body.products;

    try {
        const carritoActualizado = await cartManager.actualizarCarrito(cartId, productos);
        res.json(carritoActualizado.products);
    } catch (error) {
        console.error("Error al actualizar el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.put("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    try {
        const carritoActualizado = await cartManager.actualizarCantidadProducto(cartId, productId, quantity);
        res.json(carritoActualizado.products);
    } catch (error) {
        console.error("Error al actualizar cantidad del producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.delete("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carritoVacio = await cartManager.eliminarTodosLosProductos(cartId);
        res.json(carritoVacio);
    } catch (error) {
        console.error("Error al eliminar todos los productos del carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
