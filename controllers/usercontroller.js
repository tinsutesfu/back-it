import usermodel from'../models/usermodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from  'validator';


const createToken=(id)=> {
   return jwt.sign({id},process.env.JWT_SECRET)
}
const registeruser=async(req,res)=>{
    const { user,email, pwd } = req.body;
    try{
    if (!user,!email || !pwd) return res.status(400).json({ 'message': 'Username email and password are required.' });
    const duplicate = await usermodel.findOne({ email }).exec();
    if (duplicate) return res.sendStatus(409);
    if (!validator.isEmail()) {
        return res.json({success:false,message:'please enter valid email'});
    }
    if (pwd.length<8) {
        return res.json({success:false,message:'please enter strong password'});
    }
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newuser = new usermodel({
        username: user,
        email:email,
        password: hashedPwd
    });
    const result=await newuser.save();
    const token=createToken(result._id);
    res.json({success:true,token})
} catch (err) {
    res.status(500).json({success:true, message: err.message });
}
}
export  {registeruser};