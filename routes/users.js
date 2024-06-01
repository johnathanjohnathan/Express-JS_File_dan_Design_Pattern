const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users_controller.js')
const auth = require('../middleware/auth.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/',auth, UserController.get)
router.get('/:id', UserController.getOne)
router.delete('/:id', UserController.delete)
router.patch('/:id', UserController.updateOne)

module.exports = router