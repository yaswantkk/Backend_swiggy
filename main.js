const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const vendorRoutes=require('./routes/vendorRoutes')
const bodyparser=require('body-parser')
const firmroutes=require('./routes/firmroutes')
const productroutes=require('./routes/productRoutes')
const path =require('path')
const port=process.env.port || 5000;
const cors=require('cors')

dotenv.config();
mongoose.connect(process.env.mongo_uri)
.then(()=>{console.log("mongodb connected successfully")})
.catch((err)=>{console.log(err)})

app.use(cors())
app.use(bodyparser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmroutes)
app.use('/product',productroutes)
app.use('/uploads',express.static('uploads'))

app.listen(port,()=>{
   console.log(`server started at ${port}`)  
})

app.use('/',(req,res)=>{
   res.send("<h1>welocme to swiggy")
})