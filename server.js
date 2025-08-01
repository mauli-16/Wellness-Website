const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const router = require('./routes/users')
const errorHandler = require('./middlewares/errorHandler')
dotenv.config()
const port=5000

//connect to mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DB connected');
    
}).catch((e)=>console.log('Error message:',e));

//middleware
app.use(express.json())
app.use(errorHandler)
//routes
app.use("/",router)

app.listen(port,()=>{
    console.log(`server is running`);
    
})