const express = require('express');
const {UserModel} = require('../model/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {auth} = require('../middleware/auth.middleware');

const userRouter = express.Router();

userRouter.post('/register', async(req, res)=> {

    const {username, email, password, city, age, gender} = req.body;

    try {
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            res.status(402).send({msg: "User already exists"});
        } else{
            bcrypt.hash(password, 8, async(err, hash)=> {
                if(err){
                    res.status(403).send({msg: "Error hashing password"});
                } else if(hash) {
                    const newUser = new UserModel({username, email, password: hash, city, age, gender });
                    await newUser.save();
                    res.status(202).send({msg: "New user has been registered"});
                }
            })
        }
    } catch (error) {
        res.send({"error" : error});
    }
})

userRouter.post('/login', async(req, res)=> {

      const {email, password} = req.body;
         try {
            const existingUser = await UserModel.findOne({email});
            if(!existingUser){
                res.status(500).send({msg : "User doesn't exist."});
            } else {
                  bcrypt.compare(password, existingUser.password, async(err, result)=> {
                    if(err){
                        res.status(403).send({msg: "wrong credentials, please enter again"});
                    } else if(result){
                        const token = jwt.sign({userID : existingUser._id}, "masai");
                        res.status(200).json({msg : "login successful", token});
                    }
                  })
            }
         } catch (error) {
            res.send({"error": error});
         }
})

userRouter.post('/logout', auth, async(req, res)=> {
    res.send({msg: "user logged out successfully"});
})

module.exports = {
    userRouter
}