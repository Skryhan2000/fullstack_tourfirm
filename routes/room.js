const express=require('express')
const passport = require('passport')
const upload=require('../middleware/upload')
const controller=require('../controllers/room')
const router=express.Router()


router.get('/:hotelId',  controller.getByHotelId)//passport.authenticate('jwt', {session:false}),
router.delete('/:id', passport.authenticate('jwt', {session:false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session:false}),upload.single('image'), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session:false}),upload.single('image'), controller.update)

module.exports=router