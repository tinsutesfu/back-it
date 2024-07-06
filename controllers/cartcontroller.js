import usermodel from '../models/usermodel.js';

const addtocart=async(req,res)=>{
    try {
        let userdata=await usermodel.findById(req.body.userId);
        let cartdata=userdata.cartdata;
        if (!cartdata[req.body.productId]) {
            cartdata[req.body.productId]=1;
        } else {
            cartdata[req.body.productId]+=1;
        }

        const deliveryOptions = [
            {
              id: "1",
              deliveryDays: 7,
              priceCents: 0,
            },
            {
              id: "2",
              deliveryDays: 3,
              priceCents: 600,
            },
            {
              id: "3",
              deliveryDays: 1,
              priceCents: 1297,
            },
          ];
        await usermodel.findByIdAndUpdate(req.body.userId,{cartdata});
        res.json({ success: true, message: 'Added to cart', deliveryOptions });
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'})
    }
}


const removecart=async(req,res)=>{
    try {
        let userdata=await usermodel.findById(req.body.userId);
        let cartdata=userdata.cartdata;
        if (cartdata[req.body.productId]>0) {
            cartdata[req.body.productId]-=1;
        } 
        await usermodel.findByIdAndUpdate(req.body.userId,{cartdata});
        res.json({success:true,message:'remove from cart'});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'})
    }
}

const getcart = async (req, res) => {
    try {
      let userdata = await usermodel.findById(req.body.userId);
      let cartdata = userdata.cartdata;
  
      // Fetch delivery options from the database
      const deliveryOptions = [
        {
          id: "1",
          deliveryDays: 7,
          priceCents: 0,
        },
        {
          id: "2",
          deliveryDays: 3,
          priceCents: 600,
        },
        {
          id: "3",
          deliveryDays: 1,
          priceCents: 1297,
        },
      ];
  
      // Prepare cart data to send to frontend
      const cartArray = Object.keys(cartdata).map((key) => ({
        productId: key,
        quantity: cartdata[key],
        deliveryOptions: deliveryOptions, // Send delivery options with each cart item
      }));
  
      // Send response with success and cart data including delivery options
      res.json({ success: true, cartdata: cartArray });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: 'Error fetching cart data' });
    }
  };
export {addtocart,removecart,getcart};