import express from 'express';
import { signUpBody, signInBody, updateBody } from '../types.js';
import { User, Account } from '../db.js';
import JWT_SECRET from '../config.js';
import authMiddleware from '../middleware.js';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.get("/", (req,res) => {
    try {
        res.send("Hello World")
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })    
    } 
})

router.post("/signup", async (req,res) => {
    try {
        const existingUser = await User.findOne({
            username: req.body.username
        });

        if(existingUser){
            return res.status(411).json({
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
        await Account.create({
           userId,
           balance: 1 + Math.random() * 10000,
         });

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        return res.json({
            message: "User created successfully.",
            token: token
        })
    } catch (error) {
        console.log("Error during user signup: ", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})


router.post('/signin', async (req, res) => {
    try {
        const {success} = signInBody.safeParse(req.body)
        if(!success){
            return res.status(411).json({
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
        return;
    }

    } catch (error) {
        console.log("Error during signin: ", error);
        res.status(500).send({
            message: "Internal Server error"
        })
    }
})


router.put('/', authMiddleware, async (req, res) => {
    try {
        const {success} = updateBody.safeParse(req.body);
        if(!success){
            res.status(411).json({
                message: "Error while updating info"
            })
        }

        await User.updateOne(req.body, {
            _id: req.userId
        })

        return res.json({
            message: "Updated successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

router.get('/bulk', async (req, res) => {
    try {
        const filter = req.query.filter || "";
        const users = await User.find({

            $or: [
                {
                    firstName: {
                        $regex: filter,
                    },
                },
                {
                    lastName: {
                        $regex: filter,
                    }
                }
            ]
        })

        return res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

export {router as userRouter}