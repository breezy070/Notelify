import express from 'express'
import { login, register, resetPassword, sendEmail } from '../controllers/auth.controller.js';

const router = express.Router();

//register
router.post("/register", register)

//login
router.post("/login", login)

//send reset password email
router.post("/send-email", sendEmail)

//reset the password
router.post("/reset-password", resetPassword)

export default router;