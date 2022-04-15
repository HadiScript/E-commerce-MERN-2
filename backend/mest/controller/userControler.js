import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'





// auth user profile, either is login in or not 
// Auth
const authUserProfle = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(401)
        throw new Error('User not found')
    }
})




// getting all users only admin can access this, private
const getAllUser = asyncHandler(async (req, res) => {

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    // const count = await User.count({ ...keyword })
    const users = await User.find({ ...keyword });
    res.json(users)

})



// delete a user 
// private
// admin can delete users
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: "User removed" })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// get a user by id 
// private
// admin can delete users
const getUserById = asyncHandler(async (req, res) => {
    // pass user with password as ("-password")
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})



// update the user profile by Id
// private admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log("its user", user)
    if (user) {

        user.name = req.body.name
        user.email = req.body.email ? req.body.email : user.email;
        user.isAdmin = req.body.isAdmin
        console.log('before update', req.body)
        const updatedUser = await user.save();
        console.log('updated user', updatedUser)
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else {
        res.status(401)
        throw new Error('User not found')
    }
})




export {

    authUserProfle,

    getAllUser,

    deleteUser,
    getUserById,
    updateUser
}

