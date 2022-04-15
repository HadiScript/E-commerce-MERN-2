import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import Order from '../models/OrderModel.js';
// instead of using try catch we are using asyncHandler 
import nodemailer from 'nodemailer';


// create new order ,,,post api/post/order
const addOrderItems = asyncHandler(async (req, res) => {

    // console.log(req.user.user_id)
    const user = await User.findOne({ email: req.user.email });

    const {
        orderItems,
        totalItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPice,
        totalPrice
    } = req.body;



    let order;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new error('No order items')
        return;
    }
    else {
        order = new Order({
            orderItems,
            totalItems,
            user: user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPice,
            totalPrice
        })
    }
    const createdOrder = await order.save();

    res.status(201).json(createdOrder)
})


// get orders by id 
// get 
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }

});






const updateOrderToConfirm = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isConfirmed = true;
        order.confirmedAt = Date.now()

        const updatedOrder = await order.save();
        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
});



// post
const confirmOrder = async (req, res) => {

    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "not found" });
    let name = user.name ? user.name : user.email.split("@")[0]

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, // use SSL
        port: 25, // port for secure SMTP
        auth: {
            user: '2019cs519@gmail.com',
            pass: '852728..'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '2019cs519@gmail.com', // sender address
        to: `${req.user.email}`, // list of receivers
        subject: "confirm your order ✔", // Subject line
        text: "Confirm Your Order :)", // plain text body
        html: `<h1> hi ${name},  </h1>
                <br/>
                <p> 
                  Your order has been confirmed,
                  You will recieved in 2, 3 days                
                <p/>
                <h2> Thank You ! </h2>
            `, // html body
    }, (err, infor) => {
        if (err) {
            console.log(err)
            res.json({ mesg: err })
            return;
        }
        console.log(infor);
        res.json(infor)
    });

    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};




const myOrder = asyncHandler(async (req, res) => {

    const user = await User.findOne({ email: req.body.email });
    const order = await Order.find({ user: user._id })
    if (order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error("erro")
    }
})

const getOrderAdmin = asyncHandler(async (req, res) => {

    // const user = await User.findOne({ email: req.body.email });
    const order = await Order.find({}).populate('user', 'id name')
    res.json(order)

})


const updateOrdered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now()
        order.deliveredAt = Date.now()
        order.isDelivered = true;
        const updatedOrder = await order.save();
        res.json(updatedOrder)
    } else {
        res.status(404)

    }
});


const OrderDataForUser = asyncHandler(async (req, res) => {
    const order = await Order.find({});
    const user = await User.findById(req.params.id);

    if (user) {
        const OrderedUser = order.find(x => x.user.toString() === user._id.toString());
        if (!OrderedUser) {
            throw new Error('Users Order Not Found')
        }
        else {
            res.json(OrderedUser)
        }
    }
});

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        await order.remove()
        res.json({ message: "Order removed" })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
// deleteMyOrder
const deleteMyOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        await order.remove()
        res.json({ message: "Order removed" })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


export {
    addOrderItems,
    getOrderById,
    confirmOrder,
    updateOrderToConfirm,
    myOrder,
    getOrderAdmin,
    updateOrdered,
    OrderDataForUser,
    deleteOrder,
    deleteMyOrder
}