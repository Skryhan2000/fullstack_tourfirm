const express=require('express')
const passport = require('passport')
const upload=require('../middleware/upload')
const controller=require('../controllers/tour')
const router=express.Router()


router.get('/all/:categoryId',controller.getByCategoryId)// passport.authenticate('jwt', {session:false}), 
router.get('/find/:contry',controller.find)
router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getById)
router.delete('/:id', passport.authenticate('jwt', {session:false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session:false}),upload.single('image'), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session:false}),upload.single('image'), controller.update)

module.exports=router