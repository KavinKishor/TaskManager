const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const authRouter = require('./Routers/userRouter')
const taskRouter = require('./Routers/taskRouter')

const app = express()

app.listen(process.env.PORT,()=>{
    console.log(`port is connected on ${process.env.PORT}`) 
})
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB connected");
}).catch(()=>{
    console.log("DB not connected");
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/auth',authRouter)
app.use('/task',taskRouter)