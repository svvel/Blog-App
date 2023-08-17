// import Database Model 
import {alluserdata, creatuser, auth} from "../model/userModel.js";
import bcrypt from 'bcryptjs'

//Read All user 
export const getUser = async (req,res)=>{
    const alluser = await alluserdata()
    if (!alluser) {
      return res.status(404).json({message:'user not found'})
    }
    return res.status(200).json(alluser)
}

//Create Users
export const signup = async (req,res)=>{
    const blogs = []
    const {name, email, password} = req.body
    if (name === ""||password === "") {
      return res.status(404).json({message:"Name or password Missing"})
    }
    const hashpassword = bcrypt.hashSync(password)
    const saveduser = await creatuser(name, email, hashpassword,blogs)
    if (!saveduser) {
        return res.status(404).json({message:'user not found'})
      }else if(saveduser.message){
        return res.status(400).json(saveduser)
      }
    return res.status(201).json({user:saveduser})
}

//Authenticating User 
export const login = async (req,res)=>{
    const {email, password} = req.body;
    const [doc] = await auth(email)
    console.log("L32/ Login USer :",doc)
    if(!doc){
     return res
            .status(404)
            .json({message:'user Not Found!'})
    }
    const isPasscorrect = bcrypt.compareSync(password, doc.password)
    if (!isPasscorrect) {
       return res
              .status(400)
              .json({message:'Password Incorrect Try Again!'})
    }
    return res.status(200).json({message:'Login successfully!',user:doc})
}