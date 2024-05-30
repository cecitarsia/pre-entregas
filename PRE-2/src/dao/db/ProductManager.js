import productModel from "../models/product.model.js"

class ProductManager {

    async addProduct(title, description, code, price, status, stock, category, thumbnail) {
        try {
            const productNotValid = !title || !description || !price || !code || !stock || !status || !category

            if (productNotValid) {
                console.error("Faltan datos.")
            } else {
                let result = await productModel.create({ title, description, code, price, status, stock, category, thumbnail })
                return result
            }

        } catch (error) {
            console.error("Error al agregar producto", error);
        }
    }

    async getProducts(query) {
        try {

            let { limit = 10, page = 1, filter, sort } = query;

            let sortOptions = {};
            if (sort) {
                sortOptions.price = parseInt(sort);
            }

            let filterOptions = {};
            if (filter && filter.category) {
                filterOptions.category = filter.category;
            }

            let options = {
                limit: parseInt(limit),
                page: parseInt(page)
            };

            let products = await productModel.paginate(filterOptions, options);
            return products;

        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    }


    async getProductById(id) {
        try {
            const products = await this.getProducts()
            const productFound = products.find((product) => product.id === id)
            if (!productFound) {
                return 'El producto buscado no existe'
            } else {
                return productFound;
            }
        } catch (error) {
            console.error("ID de producto no encontrado", error);
        }
    }

    async updateProduct(id, value) {
        try {
            const products = await this.getProducts()

        } catch (error) {
            console.error("Error al actualizar el producto", error);
        }
    }


    async deleteProduct(pid) {
        try {
            let result = await productModel.deleteOne({ _id: pid })
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}


export default ProductManager