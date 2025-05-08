const express = require('express')
const router = express.Router()

const { signup, login, dashboard } = require('../controllers/main')

const authMiddleware = require('../middleware/auth')

router.route('/dashboard').get(authMiddleware, dashboard)
router.route('/signup').post(signup)
router.route('/login').post(login)

module.exports = router
