import usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const registeruser = async (req, res) => {
  const { user, email, pwd } = req.body;
  if (!user || !email || !pwd)
    return res
      .status(400)
      .json({ message: "Username email and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await usermodel.findOne({ email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "please inter valid email" });
  }
  if (pwd.length < 8) {
    return res.json({ success: false, message: "please inter strong pasword" });
  }
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await usermodel.create({
      username: user,
      email: email,
      password: hashedPwd,
    });

    console.log(result);
    const token = createToken(result._id);
    res.status(201).json({ success: `New user ${user} created!`, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const handlelogin=async(req,res)=>{
  const { user, pwd } = req.body;
  try {
  if (!user || !pwd) return res.status(400).json({success:false, 'message': 'Username and password are required.' });
  const foundUser = await usermodel.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (!match) {
      return res.json({success:false,message:'invalid credentials'})
    };
    const token = createToken(foundUser._id);
    res.status(201).json({ success:true, token });
} catch (error){
  console.log(error);
  res.json({success:true,message:'error'})
}
}
export { registeruser,handlelogin };
