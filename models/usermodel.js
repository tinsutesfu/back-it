import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type:String,
        require:true
    },
    cartdata: {
        type: Object,
        default: {}
    },
    password: {
        type: String,
        required: true
    }
    
},{minimize:false});

const usermodel =mongoose.models.user || mongoose.model('User', userSchema);
export default usermodel;