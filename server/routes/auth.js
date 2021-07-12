const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const verifyToken = require('../middleware/verifyToken');

const PostRouter = require('./post');

// Use connect method to connect to the server

router.get('/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-pass')
        if (!user) 
            return res.status(400).json({success: false, message: 'User not found'})
            
        res.json({success: true, user})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message:'Internal server Error'});
    }
})

router.post('/register', async (req, res) => {
    const {user, pass, makpp, tenkpp, macum, tencum, mavung, tenvung, vunggop, tenvunggop, role, randoom, role2, danhxung, tenuser} = req.body;
    if( !user || !pass ) 
        return res
            .status(400)
            .json({success: false, message: 'Missing username and/or password'})

        try {
            const userCheck = await User.findOne({user});
            if (userCheck)
                return res
                    .status(400)
                    .json({success: false, message: 'Username already taken'});

            const hashedPassword = await argon2.hash(pass.toString());
            const newUser = new User({
                user, pass:hashedPassword, makpp, tenkpp, macum, tencum, 
                mavung, tenvung, vunggop, tenvunggop, 
                role, randoom, role2, danhxung, tenuser
            });
            await newUser.save();
            const accessToken = jwt.sign(
                {userId: newUser._id},
                process.env.ACCESS_TOKEN,
                { expiresIn: '1h' }
            );
            res.json({success: true, message:'user created successfully', accessToken});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message:'Internal server Error'});
        }
    //res.send('USER ROUTE')
});

router.post('/login', async (req, res) => {
    const {user, pass} = req.body;
    if (!user || !pass) 
        return res
            .status(400)
            .json({success: false, message: 'Missing username and/or password'})
    try {
        // check forr existing user
        const userCheck = await User.findOne({user});
        if (!userCheck)
            return res
                .status(400)
                .json({success: false, message: 'Incorrect  username or password'});

        const PasswordValid = await argon2.verify(userCheck.pass, pass.toString());
        if (!PasswordValid)
            return res
                .status(400)
                .json({success: false, message: 'Incorrect  username or password'});

            const accessToken = jwt.sign(
                {userId: userCheck._id}, 
                process.env.ACCESS_TOKEN,
                { expiresIn: '1h' }
            );
            res.json({success: true, message:'Login successfully', accessToken});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message:'Internal server Error'});
    }

});

router.use('/posts', PostRouter);

module.exports = router;