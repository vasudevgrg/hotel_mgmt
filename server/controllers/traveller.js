const db= require("../models/index");

const createTraveller=async (req, res)=>{
    const {name, username, password}= req.body;
    const traveller=await db.Traveller.create({name, username, password});

    res.cookie("traveller_id", traveller.id, {
        httpOnly:true,
        secure:false
    });

    res.send({message:"traveller created"});
    
};

const bookhotel=async (req,res)=>{
    console.log(req.body);
    const {startDate, endDate, numberOfRooms, sizeOfRoom, hotel_id, location}= req.body;
    const hotel= await db.Hotel.findOne({
        where:{
            id:hotel_id
        }
    });

    const trip= await db.Trip.create({destination:location, startDate:startDate, endDate:endDate, traveller_id: req.cookies.traveller_id});
    await hotel.addTrip(trip);
    res.send({message:"hotel is booked"});
};

const currentTrips= async (req, res)=>{
    const allTrips= await db.Trip.findAll({
        where:{
            traveller_id: req.cookies.traveller_id
        }
    });

    // const today= new Date();
    // console.log(today);
    // const d1= today.getDate();
    // const m1= today.getMonth();

    // const d2= allTrips[0].startDate.getDate();
    // const m2= allTrips[0].startDate.getMonth();
    // console.log(allTrips[0].startDate);
    res.send({currTrips: allTrips});
}

const userInfo=async (req, res)=>{
    try{
    const user= await db.Traveller.findOne({
        where:{
            id:req.cookies.traveller_id
        }
    });

    res.send({user:user});
}catch(err){
    res.send(err);
}
}



module.exports={createTraveller, bookhotel, userInfo, currentTrips};

