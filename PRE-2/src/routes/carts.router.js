import { Router } from 'express'
import CartManager from '../dao/db/CartManager.js'

const router = Router()
const cartManager = new CartManager()

// Traer todos los carritos
router.get("/", async (req, res) => {
    const result = await cartManager.getCarts()
    res.send({ result: "success", payload: result })
})

// Traer un carrito por ID
router.get("/:cid", async (req, res) => {
    let { cid } = req.params;
    const result = await cartManager.getCartById(cid);
    res.send({ result: "success", payload: result })
})


// Agregar un carrito
router.post("/", async (req, res) => {
    const result = await cartManager.addCart();
    res.send({ result: "success", payload: result });
})

// Editar/Agregar un producto al carrito
router.post("/:cid/products/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const result = await cartManager.updateCart(cid, pid);
    res.send({ result: "success", payload: result });
})

export default router