import usermodel from '../models/usermodel.js';

const addtocart=async(req,res)=>{
    try {
        let userdata=await usermodel.findById(req.body.userId);
        let cartdata=userdata.cartdata;
        if (!cartdata[req.body.productId]) {
            cartdata[req.body.productId]=1;
        } else {
            cartdata[req.body.productId]+=1;
        }
        await usermodel.findByIdAndUpdate(req.body.userId,{cartdata});
        res.json({success:true,message:'add to cart'});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'})
    }
}


const removecart=async(req,res)=>{
    try {
        let userdata=await usermodel.findById(req.body.userId);
        let cartdata=userdata.cartdata;
        if (cartdata[req.body.productId]>0) {
            cartdata[req.body.productId]-=1;
        } 
        await usermodel.findByIdAndUpdate(req.body.userId,{cartdata});
        res.json({success:true,message:'remove from cart'});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'})
    }
}

const getcart=async(req,res)=>{
    try {
        let userdata=await usermodel.findById(req.body.userId);
        let cartdata=userdata.cartdata;
        
       
        res.json({success:true,cartdata});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'})
    }
}

export {addtocart,removecart,getcart};