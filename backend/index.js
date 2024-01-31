import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRouter from './routes/index.js'
// import { User } from './db'


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use('/api/v1', indexRouter)




app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
})