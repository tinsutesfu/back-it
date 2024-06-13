import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    const {token}= req.headers;
    if (!token){ return res.sendStatus(401)};
    
    console.log(token)
    try {
         const token_decode=jwt.verify(
        token,
        process.env.JWT_SECRET,
    );
    req.body.userId=token_decode.id;
     next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'})
    }
   
}

export default verifyJWT;