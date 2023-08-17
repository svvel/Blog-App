import mongoose from "mongoose";

const schema = mongoose.Schema;

//Schema For Storing blog
const blogSchema = new schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    }
});

//Create Collection
export default mongoose.model('blog',blogSchema)