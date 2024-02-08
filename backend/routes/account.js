import express from 'express';
import mongoose from 'mongoose';
import authMiddleware from '../middleware.js';
import { Account } from '../db.js';

const router = express.Router()

router.get('/balance', authMiddleware, async (req,res) => {
    try {
        const acc = await Account.findOne({
            userId: req.userId
        });
        res.json({
            balance: acc.balance
        })
        
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            message: "Internal server error occured, try again."
        })
    }
})

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});

export {router as accountRouter}