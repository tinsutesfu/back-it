import express from 'express';
import { placeorder, verifyorder} from '../controllers/ordercontroller.js';
import verifyJWT from '../middleware/verifyjwt.js';

const orderrouter=express.Router();

orderrouter.post('/order',verifyJWT, placeorder);
orderrouter.post('/verify', verifyorder);



export default orderrouter;