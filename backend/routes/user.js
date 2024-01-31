import express from 'express';
import signUpBody from '../types';
import {User} from '../db'
import JWT_SECRET from '../config';

const router = express.Router()

router.get("/", (req,res) => {
    res.send("Hello World")
})

router.post("/signup", async (req,res) => {
    try {
        const {success} = signUpBody.safeParseAsync(req.body)
        if(!success){
            return res.status(411).json({
                message: "Email already taken/ incorrect inputs"
            });
        }

        const existingUser = await User.findOne({
            username: req.body.username
        });

        if(existingUser){
            res.status(411).json({
              message: "Email already taken/Incorrect inputs",
            });
        };

        const user = await User.create({
          username: req.body.username,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });

        const userId = user._id;
        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.json({
            message: "User created successfully.",
            token: token
        })
    } catch (error) {
        console.log("Error during user signup: ", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

export default router;