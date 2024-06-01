const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/movies_controller.js')
const multer = require('multer')
const storage = require('../middleware/storage.js')
const upload = multer({ storage: storage })

router.post('/upload/:id', upload.single('image_url'), MovieController.upload)
router.post('/create', MovieController.create)
router.get('/', MovieController.get)
router.get('/:id', MovieController.getOne)
router.delete('/:id', MovieController.delete)
router.patch('/:id', MovieController.updateOne)

module.exports = router