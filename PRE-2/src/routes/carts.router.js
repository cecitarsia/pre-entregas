import { Router } from 'express'
const router = Router()
import CartManager from '../managers/CarttManager.js'
const cartManager = new CartManager()

// Traer todos los carritos
router.get("/", async (req,res) => {
    try {
        const carts = await cartManager.getCarts()
        res.json(carts)
    } catch (error) {
        res.status(404).json({ message: "404 - No hay carritos" });
    }
})


// Traer un carrito por ID
router.get("/:cid", async (req, res) => {
    try {
        let cid = parseInt(req.params.cid);
        const cartResult = await cartManager.getCartById(cid);
        res.json(cartResult);

        } catch (error) {
        res.status(404).json({ message: "Error 404 - Carrito no encontrado." });
    }
})

// Agregar un carrito
router.post("/", async (req, res) => {
    try {
        const result = await cartManager.addCart();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).json({ message: "Error 404 - No se pudo agregar el carrito." });
    }
})

// Editar/Agregar un producto al carrito
router.post("/:cid/products/:pid", async (req, res) => {
    try {
        let cid = parseInt(req.params.cid)
        let pid = parseInt(req.params.pid)
        const result = await cartManager.updateCart(cid,pid)
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).json({ message: "Error 404 - No se pudo agregar el producto al carrito." });
    }
    
})

export default router