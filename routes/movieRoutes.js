import express from "express"
import { getMovies, get_Movie } from "../controllers/movieControllers.js"

export const router = express()

router.route('/').get(getMovies)
router.route('/:id').get(get_Movie)