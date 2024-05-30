import { Router } from 'express';
const router = Router()
import productModel from '../dao/models/product.model.js';
import cartModel from '../dao/models/cart.model.js';
import ProductManager from '../dao/db/ProductManager.js'
const productManager = new ProductManager()



// Trae la vista de todos los productos con paginacion
router.get("/products",async(req,res)=>{
    let cid = "665780c00631c45cd5ec1dc4"
    let page = parseInt(req.query.page) || 1;
    let result = await productManager.getProducts(req.query);
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
    res.render('products', result )
    //res.render('products', { result, cartId: cid } )
})


// Trae la vista de un carrito con sus productos
router.get('/carts/:cid', async(req, res) => {
    let cid = req.params.cid;
    let result = await cartModel.findOne({ _id:cid}).populate("products.product").lean();
    result = result.products;
    // No sé como pasarle el carrito ID acá
    res.render('carts', {products: result, cartId: cid });
})

export default router