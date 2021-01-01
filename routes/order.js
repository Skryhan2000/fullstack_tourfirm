const express=require('express')
const controller=require('../controllers/order')
const passport = require('passport')
const router=express.Router()


//localhost:5000/api/auth/login
router.get('/', passport.authenticate('jwt', {session:false}), controller.getAll)
router.get('/:requestS', passport.authenticate('jwt', {session:false}), controller.getByStatus)
router.delete('/:id', passport.authenticate('jwt', {session:false}), controller.remove)
router.post('/', controller.create)// passport.authenticate('jwt', {session:false}),
router.patch('/:id', passport.authenticate('jwt', {session:false}), controller.update)

module.exports=router