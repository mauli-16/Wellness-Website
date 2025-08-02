const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const router = require('./routes/users')
const sessionRouter=require('./routes/session')
const errorHandler = require('./middlewares/errorHandler')
const cookieParser=require('cookie-parser')
const path = require("path");
dotenv.config()
const port=5000

//connect to mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DB connected');
    
}).catch((e)=>console.log('Error message:',e));

//middleware
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/",router)
app.use("/",sessionRouter)

app.use('/uploads/json', express.static(path.join(__dirname, 'uploads/json')));



app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server is running`);
    
})