import express from 'express';
import { addit, addrating, itlist, removeit } from '../controllers/itcontroller.js';
import multer from 'multer';
import verifyJWT from '../middleware/verifyjwt.js';


const itrouter=express.Router();

const storage =multer.diskStorage({
    destination:'uploads',
    filename:(req,File,cb)=>{
        return cb(null,`${Date.now()}${File.originalname}`)
    }
});

const upload=multer({storage:storage});
itrouter.post('/add',upload.single('image'),addit);
itrouter.post('/rating',verifyJWT, addrating);
itrouter.get('/list',itlist);
itrouter.post('/remove',removeit);



export default itrouter;