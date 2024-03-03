import express from 'express';
import mongoose, { mongo } from 'mongoose';
import noteRoute from './routes/note.js'
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
//Route Roots
app.use('/api/note', noteRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)


//Connection to DB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB")
    } catch (error) {
        throw error
    }
}



//error handler middleware
// app.use((err, req, res, next) => {
//     const statusCode = err.status || 500;
//     const errorMessage = err.message || "Something went wrong !";
//     return res.status(statusCode).json({
//         success: false,
//         status: statusCode,
//         message: errorMessage,
//     });
// })

//response handler middleware
app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong !";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a=>a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    });
})

//Setting up backend
app.listen(8800, () => {
    connectMongoDB();
    console.log(`Connected to backend!`)
})