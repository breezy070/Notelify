import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import UserToken from "../models/UserToken.js";


//TODO: MAKE THIS A TRYCATCH TO CATCH ERRORS
export const register = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        userName: req.body.username,
        email: req.body.email,
        password: hashedPassword
        
    });

    await newUser.save()
    return next(CreateSuccess(200, "User Registered Successfully !"))
}

export const login = async (req, res, next) => {
    try {

        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return next(CreateError(404, "User not found !"))
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if(!isPasswordCorrect) {
           
            return next(CreateError(400, "Password is incorrect  !"))
        }

        const token = jwt.sign(
        {

            id: user._id,
            isAdmin: user.isAdmin,
            email: user.email,
            username: user.userName,
        },process.env.JWT_SECRET, {expiresIn: '24h'})

        // return next(CreateSuccess(200, "Login Successful !"))
        res.cookie("access_token", token, {httpOnly: true})
        .status(200)
        .json({
            status: 200,
            message: "Login Successful !",
            data: user,
            token: token
        });

        

        

    } catch (error) {
        return next(CreateError(500, "Internal server error  !"))
    }
}

export const sendEmail = async (req, res, next) => {
    const email = req.body.email;
    //the 'i' is for not checking case senstitive
    const user = await User.findOne({email: {$regex: '^'+email+'$', $options: 'i'}});

    if (!user) {
        return next(CreateError(404, "User not found to reset the email !"))
    }

    //creating the token if user is found
    const payload = {
        email: user.email
    }
    const expiryTime = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiryTime});

    //storing the token
    const newToken = new UserToken({
        userId: user._id,
        token: token
    });

    //nodemailer
    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "fabrizio.dimarco@gmail.com",
            pass: process.env.G_SECRET
        }
    });

    //create email details
    let mailDetails = {
        from: "fabrizio.dimarco@gmail.com",
        to: email,
        subject: "Netlify - Reset Password",
        html: `
        <html>
            <head>
                <title>Password Reset Request</title>
            </head>
            <body>
                <h1>Password Reset Request</h1>
                <p>Dear ${user.userName},</p>
                <p>We have received a request to reset your netlify account password. To do this, please click on the button below:</p>
                <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: green; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px;">Reset Password</button></a>
                <p>Keep in mind that this link is only valid for 5 minutes.</p>
                <p>Netlify Thanks you,</p>
                <p>Netlify Team</p>
            </body>
        </html>

        `,
    };
    mailTransporter.sendMail(mailDetails, async(err, data) => {
        if (err) {
            console.log(err)
            return next(CreateError(500, "Something went wrong while sending the email !"))
        }else {
            await newToken.save();
            return next(CreateSuccess(200, "Email has been sent !"))
        }
    })
}

export const resetPassword = (req, res, next) => {
    const token = req.body.token;
    const newPassword = req.body.password;

    jwt.verify(token, process.env.JWT_SECRET, async(err, data) =>{
        if (err) {
            return next(CreateError(500, "Reset link is expired!"))
        }else{
            const response = data;
            const user = await User.findOne({email: {$regex: '^'+response.email+'$', $options: 'i'}});
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(newPassword, salt);
            user.password = encryptedPassword;

            try {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: user._id},
                    {$set: user},
                    {new: true}
                )
                return next(CreateSuccess(200, "Password Reset Success!"))
            } catch (error) {
                return next(CreateError(500, "Something went wrong while resetting the password"))
            }
        }
    })
}