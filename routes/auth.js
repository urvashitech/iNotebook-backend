const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { reconstructFieldPath } = require('express-validator/src/field-selection');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'urvashiyouaredoinggre$@t'; // Define your secret key for JWT here
// ROUTH1: Create a User using: POST "api/auth/". Doesn't require Auth
router.post(
    '/',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    ],
    async (req, res) => {
        let success = false;
        // If there are errors, return Bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }
        // Check whether the user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: 'Sorry, a user with this email already exists' });
            }
            // Creating salt and hash of a password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            console.log(authtoken);
            success=true;
            res.json({ success,authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);
// ROUTH2: Authenticate a user using: POST "/auth/login".
router.post(
    '/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists(),
    ],
    async (req, res) => {
        let success = false;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Please try to login with correct credentials' });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                
                return res.status(400).json({success, error: 'Please try to login with correct credentials' });
            }
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success,authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    });
// ROUTH3: Get loggedin  user Details using: POST "/auth/getuser".
router.post('/getuser',fetchuser, async(req,res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');  
    }
})
module.exports = router;

