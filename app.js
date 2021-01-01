const express = require('express')
const mongoose=require('mongoose')
const passport=require('passport')
const bodyParser=require('body-parser')
const authRoutes=require('./routes/auth')
const analyticsRoutes=require('./routes/analytics')
const categoryTourRoutes=require('./routes/categoryTour')
const employeeRoutes=require('./routes/employee')
const userRoutes=require('./routes/user')
const hotelRoutes=require('./routes/hotel')
const hotelServicesRoutes=require('./routes/hotelServices')
const orderRoutes=require('./routes/order')
const roomRoutes=require('./routes/room')
const scheduleRoutes=require('./routes/schedule')
const tourRoutes=require('./routes/tour')
const transferRoutes=require('./routes/transfer')
const keys=require('./config/keys')
const app=express()

mongoose.connect(keys.mongoURI, {
  useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(()=>console.log('MongoDB connected.'))
.catch(error=>console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/categoryTour', categoryTourRoutes)
app.use('/api/employee', employeeRoutes)
app.use('/api/user', userRoutes)
app.use('/api/hotel', hotelRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/room', roomRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/tour', tourRoutes)
app.use('/api/transfer', transferRoutes)
app.use('/api/hotelServices', hotelServicesRoutes)


module.exports=app