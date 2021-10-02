const Router = require('express')
const router = new Router()
const emailController = require('../controllers/emailController');

router.post('/send', emailController.sendEmail)

module.exports = router