import express from 'express'
import userRouter from './user.js'

const router = express.Router()

router.get('/', (req,res) => {
    try {
        res.status(200).json({
            first_name: "Jainil",
            last_name: "Modi"
        })
        console.log("Response sent successfully");
    } catch (error) {
        res.status(401).send("Caught an error")
    }
})

router.use("/user", userRouter);


export default router
