import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";

const placeorder = async (req, res) => {
  const FRONTEND_URL = 'http://localhost:5173';
  try {
    // 1. Validate request body:
    if (
      !req.body.userId ||
      !req.body.items ||
      !req.body.amount ||
      !req.body.address
    ) {
      return res.json({
        success: false,
        message: 'Missing required fields in request body',
      });
    }

    // 2. Create new order in database:
    const newOrder = new ordermodel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      deliveryId:req.body.deliveryId
    });
    await newOrder.save();

    // 3. Update user cart data (optional, can be done elsewhere):
    await usermodel.findByIdAndUpdate(req.body.userId, { cartdata: {} });

    // No Stripe integration here - payment processing removed

    // 4. Send successful response:
    res.json({ success: true, message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error processing order' });
  }
};



const userorder = async (req, res) => {
  try {
    const orders = await ordermodel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error' });
  }
};

const listorder=async(req,res)=>{
try {
  const orders=await ordermodel.find({});
  res.json({success:true,data:orders})
} catch (error) {
  console.error(error);
  res.json({ success: false, message: 'Error' });
}
}


export { placeorder, userorder,listorder };
