import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import Report from '../models/reportModel.js';
import Order from '../models/OrderModel.js';
import nodemailer from 'nodemailer';


const AddingReports = asyncHandler(async (req, res) => {
    try {
        const reportFind = await Report.find({})
        if (reportFind.filter(x => x.orderId.toString() === req.body.orderId.toString()).length > 0) {
            return res.status(400).json({ message: ` ${req.body.orderId} is Already Reported` })
        }

        const report = new Report({
            userId: req.body.userId,
            orderId: req.body.orderId,
            createdAt: req.body.createdAt,
            isDelivered: req.body.isDelivered,
            typeReport: req.body.typeReport
        });
        await Order.findOneAndUpdate({ _id: req.body.orderId },
            { $set: { reported: true } },
            { new: true }
        );

        const createReport = await report.save();

        res.status(201).json(createReport)
    } catch (err) {
        console.log(err);
        res.status(400);
        throw new Error('Server error')
    }
})


const getReports = asyncHandler(async (req, res) => {

    const reports = await Report.find({}) //find everything
    res.json({ reports });
})

const getReportById = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id);

    if (report) {
        res.json(report);
    } else {
        res.status(404)
        throw new Error('report not found');
    }
})


const updateReport = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id);
    let user = await User.findById(report.userId);
    let order = await Order.findById(report.orderId);
    if (report && user && order) {
        console.log(user.email, "here is email");

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
            to: `${user.email}`, // list of receivers
            subject: "Report has been confirmed", // Subject line
            text: "Confirm Your Order :)", // plain text body
            html: `<h1> Report Confirmation  </h1>
                    <br/>
                    <p> 
                     Your report has been confirm,
                     orders: ${order.orderItems.length}
                                     
                    <p/>
                    </br>
                    <strong> Please contact our office 03XX-XXXXXXX </strong>
                    <h2> Thank You ! </h2>
                `, // html body
        }, (err, infor) => {
            if (err) {
                console.log("here is error", err)
                res.json({ mesg: err })
                return;
            }
            console.log(infor, "has been passed");
            res.json(infor)
        });

        report.confirmation = true;
        const updatedreport = await report.save();
        res.json(updatedreport)


    } else {
        res.status(404)
    }
});

const deleteReport = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id)

    if (report) {
        await report.remove()
        res.json({ message: "Report removed" })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})



export {
    AddingReports,
    getReports,
    getReportById,
    updateReport,
    deleteReport
}

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     secure: false, // use SSL
//     port: 25, // port for secure SMTP
//     auth: {
//         user: '2019cs519@gmail.com',
//         pass: '852728..'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

// // send mail with defined transport object
// let info = await transporter.sendMail({
//     from: '2019cs519@gmail.com', // sender address
//     to: `${user.email}`, // list of receivers
//     subject: "Report has been confirmed", // Subject line
//     text: "Confirm Your Order :)", // plain text body
//     html: `<h1> Report Confirmation  </h1>
//             <br/>
//             <p> 
//              Your report has been confirm,
//              orders: ${order.orderItems.length}                
//             <p/>
//             <h2> Thank You ! </h2>
//         `, // html body
// }, (err, infor) => {
//     if (err) {
//         // console.log("here is error", err)
//         // res.json({ mesg: err })
//         return;
//     }
//     console.log(infor, "has been passed");
//     res.json(infor)
// });

//email 