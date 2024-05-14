import express from "express";
import { userLogin, userSignup } from "../controllers/authControllers.js";

export const router = express.Router();

router.route('/login').post(userLogin);
router.route('/signup').post(userSignup);

