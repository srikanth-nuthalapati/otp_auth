const express = require("express")
const nodemailer = require("nodemailer");
const otp = require("./otp.js")
const cors = require("cors");
const e = require("express");
require("dotenv").config()
let app = express();

app.use(cors());
app.use(express.json())


let transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.mail,
        pass: process.env.apppass
    }
})

let storeOtp = {};

app.post("/gmail",(req,res)=>{
    let code = otp();
    console.log(code);
    storeOtp[req.body.email] = code;
    let options = {
            from: 'srikanthjames30@gmail.com',
            to: req.body.email,
            subject: 'sending mail using nodemailer',
            text: `this is your 4 digit otp ${code}`
        };
    
    transporter.sendMail(options,(err,info)=>{
        if(err){
            res.status(500).json({
                status: 500,
                message: "Error sending email",
                error: err.message
            });  
        }
        else{
            res.status(200).json({
                status: 200,
                message: "OTP sent successfully",
                info: info
            });          
        }
    });
});

app.post("/verify",(req,res)=>{
    if(storeOtp[req.body.email] == req.body.otp){
        res.send({
            status:200,
            message:"otp is correct"
        });
    }
    else{
        res.send({
            status:400,
            message:"otp is incorrect"
        })
    }
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
