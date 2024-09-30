const express = require('express')
const router = require('./controller/auth')
const app = express()
const cors=require('cors')
app.use(cors({origin: 'http://localhost:3000', credentials: true,}))
app.use(express.json())
app.use(router)
app.listen(8080, () => {
    console.log("server start")
})

