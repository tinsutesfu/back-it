import mongoose from 'mongoose';

const orderschema=new mongoose.Schema({
    userId:{type:Object,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:'order processing'},
    date:{type:Date,default:Date.now()},
    deliveryId:{type:String,required:true},
    payment:{type:Boolean,default:true }
});

const ordermodel =mongoose.models.order || mongoose.model('order', orderschema);
export default ordermodel;