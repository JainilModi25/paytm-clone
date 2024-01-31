import express from 'express';

const router = express.Router()

router.get("/", (req,res) => {
    res.send("Hello World")
})

router.post("/signup", (req,res) => {
    try {
        
    } catch (error) {
        
    }
})

export default router;