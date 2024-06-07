import itModel from "../models/itmodel.js";
import fs from 'fs';

const addit=async (req,res)=>{
    let image_filename=`${req.file.filename}`;
    const it =new itModel({
        image:image_filename,
        name:req.body.name,
        rating: {
            stars:req.body.rating.stars,
            count:req.body. rating.count,
        },
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

export {addit,itlist,removeit };