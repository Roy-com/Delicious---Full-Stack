const express = require("express");
const router = express.Router();
const UserCollection = require("../model/UserDetails");
const UserDetails = UserCollection.UserDetails;
const bcrypt = require("bcryptjs");




router.post("/reset-password/:id/:token", async (req, res) => {
    // const newPassword = req.body.password
    // const sentToken = req.params.token
    // console.log(sentToken)
    // console.log(req.params._id)


    // const user = await UserDetails.findOne({ _id: req.params.id });
    // if (!user) return res.status(400).send({ message: "Invalid link" });

    // UserDetails.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    // .then(user=>{
    //     if(!user){
    //         return res.status(422).json({error:"Try again session expired"})
    //     }
    //     bcrypt.hash(newPassword,10).then(hashedpassword=>{
    //        user.password = hashedpassword;
    //        user.repassword = hashedpassword;
    //        user.resetToken = undefined
    //        user.expireToken = undefined
    //        user.save().then((saveduser)=>{
    //            res.json({status:"ok",message:"password updated success"})
    //        })
    //     })
    // }).catch(err=>{
    //     console.log(err)
    // })

    try{
        const newPassword = req.body.password
        const user = await UserDetails.findOne({ _id: req.params.id });
        console.log("x",user)
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await UserDetails.findOne({
			userId: user._id,
			token: req.params.token,
		});
        if (!token) return res.status(400).send({ message: "Invalid link" });
        console.log("a")
         bcrypt.hash(newPassword,10).then(hashedpassword=>{
            user.password = hashedpassword;
            user.repassword = hashedpassword;
            console.log("b")
           token.remove();
            user.resetToken = undefined
            user.expireToken = undefined
            console.log("c")
            user.save().then((saveduser)=>{
                console.log("d")
                res.json({status:"ok",message:"password updated success"})
            })
         })

    }
    catch(error){
        res.status(500).send({ error: "Internal Server Error" });
    }
  });


  module.exports = router;