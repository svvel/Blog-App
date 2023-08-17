import mongoose from "mongoose";

const schema = mongoose.Schema;

//Schema For Storing Users
const userSchema = new schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
        minlength: 6
    },
    blogs:[{
        type: mongoose.Types.ObjectId,
        ref: 'blog',
        require: true
    }]
});

//Create Collection
export default mongoose.model('user',userSchema)