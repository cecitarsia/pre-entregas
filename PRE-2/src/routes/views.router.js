import { Router } from 'express';
const router = Router()
import productModel from '../dao/models/product.model.js';
import cartModel from '../dao/models/cart.model.js';
import ProductManager from '../dao/db/ProductManager.js'
import CartManager from '../dao/db/CartManager.js'

const productManager = new ProductManager()
const cartManager = new CartManager()


// Trae la vista de todos los productos con paginacion
router.get("/products",async(req,res)=>{
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    let result = await productModel.paginate({}, { page, limit: 10, lean: true })
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
    res.render('products', result)
})


// Trae la vista de un carrito
router.get('/carts/:cid', async(req, res) => {
    let { cid } = req.params;
    let result = await cartModel.findOne({ _id:cid}).populate("products.product").lean();
    result = result.products;
    res.render('carts', {products: result});
})

export default router