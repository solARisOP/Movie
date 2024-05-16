import express from "express"
import { getAllLists, deleteList, getList, updateList, createList } from "../controllers/listControllers.js"
import { validatToken } from "../middleware/authMiddleware.js"
import { redirectRequest } from "../controllers/redirectController.js"

export const router = express()
router.route('/').get(redirectRequest)
router.route('/home').get(redirectRequest)
router.route('/:id').get(redirectRequest)
router.use(validatToken)
router.route('/home').post(getAllLists)
router.route('/').post(createList).put(updateList).delete(deleteList)
router.route('/:id').post(getList)

