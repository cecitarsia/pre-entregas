import cartModel from "../models/cart.model.js"

class CartManager {

    async addCart() {
        try {
            const cart = { products: [] };
            let result = await cartModel.create(cart)
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getCarts() {
        try {
            let carts = await cartModel.find()
            return carts;
        } catch (error) {
            console.log(error)
        }
    }


    async getCartById(cid) {

    try {
        let result = await cartModel.findOne({ _id: cid }).populate("products.product");
        return result;
    } catch (error) {
        console.log(error);
    }

}

    
}

export default CartManager