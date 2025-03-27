import express from 'express';
import { loginUser, registerUser } from '../controllers/userAuthControlller.js';

const AuthRouter = express.Router();

AuthRouter.post("/register",registerUser);
AuthRouter.post("/login",loginUser);

export default AuthRouter