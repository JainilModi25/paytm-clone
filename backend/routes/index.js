import express from 'express'
import { userRouter } from './user.js'
import { accountRouter } from './account.js'

const router = express.Router()   //creates instance of router obj /api/v1

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
router.use("/account", accountRouter);


export default router
