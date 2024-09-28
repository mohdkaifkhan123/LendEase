const express = require("express");
const router = express.Router();
const user = require("../model/auth");
const bcrypt=require("bcrypt")
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  console.log("sdfghjk", email);
  try {
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const data = new user({ email, password:hashedPassword, role });
    const users = await data.save();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ err });
  }
});
router.post("/login",async(req,res)=>{
  
  try{

  }catch(error){

  }
})
module.exports = router;
