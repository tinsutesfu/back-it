import express from 'express';
import { addit, itlist, removeit } from '../controllers/itcontroller.js';
import multer from 'multer';


const itrouter=express.Router();

const storage =multer.diskStorage({
    destination:'uploads',
    filename:(req,File,cb)=>{
        return cb(null,`${Date.now()}${File.originalname}`)
    }
});

const upload=multer({storage:storage});
itrouter.post('/add',upload.single('image'),addit);
itrouter.get('/list',itlist);
itrouter.post('/remove',removeit);



export default itrouter;