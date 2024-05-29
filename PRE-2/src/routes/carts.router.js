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

//// TO DO /////////////////////////////////////////////////////
router.delete("/:cid/products/:pid ", (req, res) => {
    //deberá eliminar del carrito el producto seleccionado.
})

router.put("/:cid", (req, res) => {
    // deberá actualizar el carrito con un arreglo de productos con el formato especificado anteriormente.
})

router.put("/:cid/products/:pid", (req, res) => {
    // deberá actualizar la cantidad de un producto en el carrito.
})

router.delete("/:cid", (req, res) => {
    // deberá eliminar los products del carrito seleccionado.
})
///////////////////////////////////////////////////////////////


export default router