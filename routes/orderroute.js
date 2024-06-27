import express from 'express';
import { listorder, placeorder, userorder} from '../controllers/ordercontroller.js';
import verifyJWT from '../middleware/verifyjwt.js';

const orderrouter=express.Router();

orderrouter.post('/order',verifyJWT, placeorder);

orderrouter.post('/userorder', verifyJWT,userorder);

orderrouter.get('/list',listorder)

export default orderrouter;