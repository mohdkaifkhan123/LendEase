const express=require('express')

// const mongoose= require('./connection/connection')
const router=require('./controller/auth')
const app=express()

app.use(express.json())
app.use(router)
app.listen(8080,()=>{
    console.log("server start")
})

