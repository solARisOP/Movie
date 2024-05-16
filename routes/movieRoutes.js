import express from "express"
import { getMovies } from "../controllers/movieControllers.js"
import { validatToken } from "../middleware/authMiddleware.js"
import { redirectRequest } from "../controllers/redirectController.js"

export const router = express()
router.route('/').get(redirectRequest)
router.use(validatToken)
router.route('/').post(getMovies)