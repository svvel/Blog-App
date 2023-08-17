import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import route from './route/userRoutes.js'
import blogroutes from './route/blogRoutes.js'
import cors from 'cors'

const app = express()
const port = 5000
//Cors For Enable server to server send data  
app.use(cors())
//Parsing Json data From req Body
app.use(express.json())

app.use('/user',route)
app.use('/blog',blogroutes)

//Mongodb Atlas Connection 
mongoose
  .connect('mongodb+srv://vel02:lBo4OIFTggczDbkM@cluster0.bzn6k2r.mongodb.net/Blog?retryWrites=true&w=majority')
  .then(
    ()=>{console.log('MONGODB connect')}
    )
  .then(
    app.listen(port,()=>{console.log(`server runs port ${port}`)})
    )
  .catch((err)=>{console.log(err)})
