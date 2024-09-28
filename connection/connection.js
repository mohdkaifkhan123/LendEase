const mongoose= require('mongoose')



mongoose.connect('mongodb://localhost:27017/lendease').then(()=>{
    console.log('Connected Successfully')
}).catch((err)=>{
    console.log(err)
})


module.exports=mongoose