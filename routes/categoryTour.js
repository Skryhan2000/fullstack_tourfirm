const express=require('express')
const passport = require('passport')
const upload=require('../middleware/upload')
const controller=require('../controllers/categoryTour')
const router=express.Router()



router.get('/', controller.getAll)//passport.authenticate('jwt', {session:false}),
router.get('/:id', controller.getById)//passport.authenticate('jwt', {session:false}),
router.delete('/:id',passport.authenticate('jwt', {session:false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session:false}), upload.single('image'), controller.create) 
router.patch('/:id',passport.authenticate('jwt', {session:false}),upload.single('image'), controller.update)


module.exports=router