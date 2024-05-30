// IMPORTS   
import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
// console.log(process.env.MONGO_URL)
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import productModel from './dao/models/product.model.js'

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))




app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

// Llamo a las rutas
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)


// Dejé el link de Mongo acá porque me tira error en el .env argumentando que no es un String (independientemente de si lo pongo con "" o no)
const environmment = async () => {
    await mongoose.connect("mongodb+srv://ceciliatarsia:cvMYcDEh8AFWoIYQ@cluster0.t9jz5hn.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => { console.log("Conectado a la base de datos") })
    .catch(error => console.error("Error en la conexion", error))
    // let response = await productModel.paginate({category:"Vinos"}, {limit:3, page:2})
    // console.log(response)
}
environmment()
