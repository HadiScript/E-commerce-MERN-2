import User from '../models/userModel.js'

const admin = async (req, res, next) => {
    const adminUser = await User.findOne({ email: req.user.email })
    if (adminUser.isAdmin) {
        next();
        console.log("admin running");
    }
    else {
        res.status(401)
        res.json("error")

    }
}

// Errors
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
    console.log(err.message);


}


export { notFound, errorHandler, admin };


