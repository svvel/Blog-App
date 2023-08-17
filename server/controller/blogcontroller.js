import { readblog, createblog, updatingblog,blogsbyid, deleteblog,usersblog } from "../model/BlogModel.js"

export const getblogs = async (req,res)=>{
       const blogs = await readblog()
       if (!blogs) {
        return res.status(404).json({message:'No Blogs!'})
       }
       return res.status(200).json({blogs})
}

export const addblogs = async (req,res)=>{
       const {title,description,image,user} = req.body
       const returnData = await createblog(title,description,image,user)
       if (!returnData) {
              return res.status(400).json({message:'problem to create blog'})
       }else if(returnData.Message){
              return res.status(400).json(returnData)
       }
       console.log(returnData);
       return res.status(200).json({msg:'successfully created a blog post'})
}

export const updateblog = async (req,res) =>{
       const {title,description,image} = req.body
       const id = req.params.id
       try {
              const updateDoc = await updatingblog(id,title,description,image)
              if(!updateDoc){
                     return res.status(500).json({Message:"unable to update"})
              }
              return res.status(200).json({updateDoc})
       } catch (error) {
              console.log(error)
       }
}

export const getbyid = async (req,res)=>{
       const id = req.params.id
       try {
              const blog =  await blogsbyid(id)
              if(!blog){
                     return res.status(404).json({Message:"Blog Not Found"})
              }
              return res.status(200).json({blog})             
       } catch (error) {
              console.log(error)
       }
}

export const deletebyid = async (req,res) =>{
       const id = req.params.id
       try {
            const blog = await deleteblog(id)
            if (!blog) {
              return res.status(500).json({Message:"Not Deleted"})
            }
            return res.status(200).json({MEssage:"Successfully Deleted"})  
       } catch (error) {
              console.log(error)
       }
};

export const getbyuser =async (req,res)=>{
       const userid = req.params.id;
       const blogbyuser = await usersblog(userid)
       if(!blogbyuser){
              return res.status(400).json({Message:'Blog Not Found'})
       }
       return res.status(200).json(blogbyuser)
}
