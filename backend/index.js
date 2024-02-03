import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRouter from './routes/index.js'
// import { User } from './db'


const app = express();            //declaring instance of express app
dotenv.config();                  //used to load variables declared in .env file
app.use(express.json());          //used to parse incoming requests with JSON payloads. part of body-parser
app.use(cors());                  //cross origin resource sharing, security feature, permits web pages to make requests to diff domains,
                                  //includes necessary things in the header
app.use('/api/v1', indexRouter)




app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
})