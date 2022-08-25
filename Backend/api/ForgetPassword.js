const express = require("express");
const router = express.Router();
const UserCollection = require("../model/UserDetails");
const UserDetails = UserCollection.UserDetails;
const nodemailer=require("nodemailer");
const crypto = require("crypto");
const HOST =  process.env.SMTP_HOST
const PORT =  process.env.SMTP_PORT
const USER =  process.env.SMTP_USER
const PASS =  process.env.SMTP_PASS



router.post("/forget-password", async (req, res) => {

    const { email } = req.body
  
       // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
        const transporter = nodemailer.createTransport({
            host: HOST,
            port : PORT,
            secure: false,
            requireTLS: true,
            auth: {
            user: USER,
            pass: PASS
            },
            tls:{
                rejectUnauthorized:false
            }
        })
  
  
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        UserDetails.findOne({email : email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User does not exist in our database"})
            }
            console.log(user.email)
            console.log(USER)
            user.resetToken = token
            user.expireToken = Date.now() + 10000
            user.save().then((result)=>{
                console.log(result)
                transporter.sendMail({
                    to:user.email,
                    from:USER,
                    subject:"Password reset request",
                    html:`
                    <p>You requested for password reset from Arc Invoicing application</p>
                    <h5>Please click this <a href="http://127.0.0.1:5501/Frontend/src/admin/ResetPassword.html">link</a> to reset your password</h5>
                    <p>Link not clickable?, copy and paste the following url in your address bar.</p>
                    <p>http://127.0.0.1:5501/Frontend/src/admin/ResetPassword.html</p>
                    <P>If this was a mistake, just ignore this email and nothing will happen.</P>
                    `
                })
                res.json({status:"ok", userId: user._id, forgetToken:token})
            }).catch((err) => console.log(err))
  
        })
    })
});
  
module.exports = router;