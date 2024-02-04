import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_URL);

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

export { Account, User }