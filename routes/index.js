const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter');
const emailRouter = require('./emailRouter');

router.use('/user', userRouter)
router.use('/email', emailRouter)


module.exports = router