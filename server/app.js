import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import route from './route/userRoutes.js'
import blogroutes from './route/blogRoutes.js'
import cors from 'cors'
import 'dotenv/config'



const app = express()
const port = process.env.PORT
//Cors For Enable server to server send data  
app.use(cors())
//Parsing Json data From req Body
app.use(express.json())

app.use('/user',route)
app.use('/blog',blogroutes)

//Mongodb Atlas Connection 
mongoose
  .connect(process.env.MONGODB_URL)
  .then(
    ()=>{console.log('MONGODB connect')}
    )
  .then(
    app.listen(port,()=>{console.log(`server runs port ${port}`)})
    )
  .catch((err)=>{console.log(err)})
