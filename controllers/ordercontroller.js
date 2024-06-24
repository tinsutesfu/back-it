import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import Stripe from 'stripe';

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)



const placeorder = async (req, res) => {
  const FRONTEND_URL='http://localhost:5173'
  try {
    // 1. Validate request body:
    if (!req.body.userId || !req.body.items || !req.body.amount || !req.body.address) {
      return res.json({ success: false, message: 'Missing required fields in request body' });
    }

    // 2. Create new order in database:
    const newOrder = new ordermodel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // 3. Update user cart data (optional, can be done elsewhere):
    await usermodel.findByIdAndUpdate(req.body.userId, { cartdata: {} });

    // 4. Prepare Stripe line items:
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name, // Use a relevant product name
        },
        unit_amount: item.price * 100, // Convert price to cents
      },
      quantity: item.quantity,
    }));

    // 5. Create Stripe Checkout Session:
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`, // Replace with your frontend verification URL
      cancel_url: `${FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`, // Replace with your frontend verification URL
    });

    // 6. Send successful response with session URL:
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error processing order' });
  }
};

const verifyorder=async(req,res)=>{
  const {orderId,success}=req.body;
  try {
    if (success==='true') {
      await ordermodel.findByIdAndUpdate(orderId,{payment:'true'});
      res.json({success:true,message:'paid'});
    } else {
      await ordermodel.findByIdAndUpdate(orderId);
      res.json({success:false,message:'not paid'});
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error' });
  }
}

export {placeorder,verifyorder}; 
