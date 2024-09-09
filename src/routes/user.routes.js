import { Router } from 'express'
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller.js'
import { handleError } from '../middlewares/middleware.js'

const router = Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', handleError, createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser) // Added this line for delete

export default router
