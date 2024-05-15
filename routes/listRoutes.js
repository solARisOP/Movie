import express from "express"
import { getAllLists, deleteList, getList, updateList, createList } from "../controllers/listControllers.js"

export const router = express()

router.route('/').post(createList).get(getAllLists).put(updateList).delete(deleteList)
router.route('/:id').get(getList)

