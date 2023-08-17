//User Schema
import user from "./userSchema.js";

// Fetch All User
export const alluserdata = async ()=>{
    let users = '';
    try {
        users = await user.find()
    } catch (error) {
        console.log(error)
    }
   return users;
}

//Save New User
export const creatuser = async (name, email, password)=>{
    try {
        const exuser = await user.findOne({email:email})
        if (exuser) {
            return {message:"exsiting user id"}
        }
    } catch (error) {
        console.log(error)
    }
    try{
       const saveduser = await user.create({name:name, email:email,password:password})
       return saveduser;
    } catch(err){
        console.log(err)
    }
}

//Authenticating user
export const auth = async (email)=>{
    try {
        const authdoc = await user.find({email})
        if(authdoc){
            return authdoc
        }else{
            return false
        }     
    } catch (error) {
        console.log(error)
    }
}