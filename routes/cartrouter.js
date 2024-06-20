import express from 'express';
import { addtocart, getcart, removecart} from '../controllers/cartcontroller.js';
import verifyJWT from '../middleware/verifyjwt.js';

const cartrouter=express.Router();

cartrouter.post('/add',verifyJWT, addtocart);
cartrouter.post('/remove',verifyJWT,removecart);
cartrouter.get('/get',verifyJWT,getcart);


export default cartrouter;