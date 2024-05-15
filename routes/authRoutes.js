import express from "express";
import { userLogin, userSignup, authView } from "../controllers/authControllers.js";

export const router = express.Router();
router.route('/').get(authView)
router.route('/login').post(userLogin);
router.route('/signup').post(userSignup);

