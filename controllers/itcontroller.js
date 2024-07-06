import itModel from "../models/itmodel.js";
import fs from 'fs';

const addit=async (req,res)=>{
    let image_filename=`${req.file.filename}`;
    const it =new itModel({
        image:image_filename,
        name:req.body.name,

        ratingstars: req.body.ratingstars, 
           ratingcount: req.body.ratingcount, 
        priceCents:req.body.priceCents
    })
    try{
        await it.save();
        res.json({success:true,message:'it added'})
    }catch(error){
        console.log(error);
        res.json({success:false,message:'error'})
    }

};


const addrating  =async (req, res) => {
    const { productId, rating } = req.body;
    const userId = req.body.userId;
    if (!productId || !rating) {
      return res.json({ success: false, message: 'Missing required data' });
    }
  
    try {
      const it = await itModel.findById(productId);
      if (!it) {
        return res.json({ success: false, message: 'Product not found' });
      }
  
      // Check if user has already rated this product
      const existingRating = it.userRatings.find(
        (rating) => rating.userId.toString() === userId// Assuming you have user authentication in place
      );
  
      if (existingRating) {
        return res.json({ success: false, message: 'You have already rated this product' });
      }
  
      // Update user ratings array
      it.userRatings.push({
        userId, // Assuming you have user authentication and can access user ID
        rating,
      });
  
      // Update overall rating and count (consider weighted average for overall rating)
      const totalRatings = it.userRatings.length;
      const totalRating = it.userRatings.reduce((acc, rating) => acc + rating.rating, 0);
      it.ratingstars = totalRating / totalRatings || 0; // Handle potential division by zero
      it.ratingcount = totalRatings;
  
      await it.save();
      res.json({ success: true, message: 'Your rating has been submitted!' });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: 'An error occurred. Please try again later.' });
    }
  }


const itlist=async (req,res)=>{
    try{
        const its=await itModel.find({});
        res.json({success:true,data:its})
    }catch (error) {
        console.log(error);
        res.json({success:false,message:'error'})
    }
};

const removeit=async (req,res)=>{
    try {
        const it=await itModel.findById(req.body.id);
        fs.unlink(`uploads/${it.image}`,()=>{});
        await itModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:'it removed'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'})
    }
}

export {addit,itlist,removeit,addrating };