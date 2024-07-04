const express= require("express");
const { Login } = require("../controllers/login");

const router= express.Router();

router.get("/login", Login);
module.exports=router;