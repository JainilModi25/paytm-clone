import express from 'express';
import signUpBody from '../types';
import { signInBody } from '../types';
import {User} from '../db'
import JWT_SECRET from '../config';

const router = express.Router()

router.get("/", (req,res) => {
    res.send("Hello World")
})

router.post("/signup", async (req,res) => {
    try {
        const existingUser = await User.findOne({
            username: req.body.username
        });

        if(existingUser){
            res.status(411).json({
              message: "You've already registered!",
            });
        };

        const {success} = signUpBody.safeParse(req.body)
        if(!success){
            return res.status(411).json({
                message: "Incorrect inputs"
            });
        }

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


router.post('/signin', async (req, res) => {
    try {
        const {success} = signInBody.safeParse(req.body)
        if(!success){
            res.status(411).send({
                message: "This email or password does not match an account, Try again."
            })
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })

        if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
    }

    } catch (error) {
        console.log("Error during signin: ", error);
        res.status(500).send({
            message: "Internal Server error"
        })
    }
})




export default router;