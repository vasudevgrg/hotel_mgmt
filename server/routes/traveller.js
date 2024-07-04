const express= require("express");
const { createTraveller, bookhotel, userInfo, currentTrips } = require("../controllers/traveller");
const router=express.Router();

router.post("/createtraveller",createTraveller);
router.post("/bookhotel",bookhotel);
router.get("/userinfo", userInfo);
router.get("/currenttrip", currentTrips);

module.exports= router;