import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'



const addToCart = asyncHandler(async (req, res) => {

    const user = await User.findOne({ email: req.user.email });

    if (user) {

    }


})