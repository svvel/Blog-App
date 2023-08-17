import mongoose from "mongoose";
import blogmodel from "./BlogSchema.js";
import User from "./userSchema.js";

export const readblog = async()=>{
    const blogdoc = await blogmodel.find().populate('user')
    if (!blogdoc) {
       return false 
    }
    return blogdoc;
};

export const createblog = async(title,description,image,user)=>{
    let existingUser ;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        console.log(error)
    };

    if (!existingUser) {
        return {Message:"Not Valid User"}
    };

    const blog = new blogmodel({
        title,
        description,
        image,
        user
    });
    
    try {
        const session = await mongoose.startSession()
        session.startTransaction();
        await blog.save({session})
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction()
        session.endSession()
        if (blog) {
            return blog
        };
        return false  
    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        session.endSession()
    };

};

export const updatingblog = async(id,title,description,image)=>{
    try {
        const updateData = await blogmodel.findByIdAndUpdate(id,{title,description,image})
        if (!updateData) {
            return false
        };
        return updateData        
    } catch (error) {
        console.log(error)
    };
};

export const blogsbyid = async (id)=>{
        try {
            const matchblog = await blogmodel.findById(id)
            if (!matchblog) {
                return false
            };
            return matchblog
        } catch (error) {
            console.log(error)
        };
};

export const deleteblog=async(id)=>{
        let blog ;
        try {
            blog = await blogmodel.findByIdAndRemove(id).populate('user');
            await blog.user.blogs.pull(blog);
            await blog.user.save();
            console.log(blog);
        } catch (error) {
            console.log(error)
        };

        if (!blog) {
            return false
        };
        return blog
};

export const usersblog =async (id)=>{
    let blog;
    try {
        blog = await User.findById(id).populate('blogs');
    } catch (error) {
        return console.log(error)
    };

    if(!blog){
        return false
    }
    return blog;
}