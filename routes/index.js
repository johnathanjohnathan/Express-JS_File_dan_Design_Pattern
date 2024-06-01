const express = require('express')
const router = express.Router()
const users = require('./users.js')
const movies = require('./movies.js')

router.use('/users', users)
router.use('/movies', movies)

module.exports = router