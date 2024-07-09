import express from 'express';
import { addit, addrating, itlist, removeit } from '../controllers/itcontroller.js';
import multer from 'multer';
import verifyJWT from '../middleware/verifyjwt.js';
import path from 'path';
import { fileURLToPath } from 'url';
const itrouter=express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../amazon/public/uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${file.originalname}`);
    }
  });
  

const upload=multer({storage:storage});
itrouter.post('/add',upload.single('image'),addit);
itrouter.post('/rating',verifyJWT, addrating);
itrouter.get('/list',itlist);
itrouter.post('/remove',removeit);



export default itrouter;