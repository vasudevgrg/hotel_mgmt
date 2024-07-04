const db= require("../models/index");
const fileUploadServices= require("../services/FileUpload");
const { Op } = require('sequelize');


const createHotel= async (req, res)=>{
    const {name, username, password,rooms, location, ratings, amenities}= req.body;
    
    let amenity=amenities;
    if(Array.isArray(amenities)==false){
       amenity= amenities.split(" ");
    }

    const hotel= await db.Hotel.create({name, username, password, location, ratings});

   rooms.map(async e=>{
    const {roomno,size,price}=e;
    await db.Room.create({roomno,size,price,hotel_id:hotel.id});
});

amenity.map(async e=>{
    const amenity= await db.Amenity.create({name:e});
    await hotel.addAmenity(amenity);
    // await db.Hotel_Amenity.create({hotel_id:hotel.id, amenity_id: amenity.id});
})

const obj= await fileUploadServices.createImageUpload();
 

    res.cookie("hotel_id",hotel.id,{
        httpOnly:true,
        secure:false
    });

 

res.send({message:"Hotel Added in our database",signedUrl:obj});
};

const updateurl=async (req, res)=>{
    const {url}= req.body;

const hotel_id= req.cookies.hotel_id;
    await db.Hotel.update(
        {hotel_pic:url},
        {where:{
            id:hotel_id
        }}
    );
    res.send({message:"url updated"});
};

const search = async (req, res) => {
    try {
      const pageSize = parseInt(req.query.pageSize, 10);
      const pageNumber = parseInt(req.query.pageNumber, 10);
      const { location } = req.body;
  
      // Fetch hotels along with their rooms and amenities
      const getHotels = await db.Hotel.findAll({
        where: { location },
        include: [
          {
            model: db.Room,
          },
          {
            model: db.Amenity,
          }
        ]
      });
  
      
      const hotelsWithPrices = getHotels.map(hotel => {
        const hotelObj = hotel.get({ plain: true });
        const rooms = hotelObj.Rooms;
        const totalRoomPrice = rooms.reduce((total, room) => total + room.price, 0);
        hotelObj.price = rooms.length > 0 ? totalRoomPrice / rooms.length : 0;
        return hotelObj;
      });
  
      // Paginate the results
      const startIdx = (pageNumber - 1) * pageSize;
      const endIdx = Math.min(pageNumber * pageSize, hotelsWithPrices.length);
      const paginatedHotels = hotelsWithPrices.slice(startIdx, endIdx);
  
      res.send({ hotels: paginatedHotels });
    } catch (error) {
      console.error('Error fetching hotels:', error);
      res.status(500).send({ error: 'An error occurred while fetching hotels' });
    }
  };
  
  module.exports = search;
  
const handleCookie=async (req, res)=>{
    const cookie= req.cookies.hotel_id;
    res.send({cookie: cookie});
}


const handleCitySuggestion = async (req, res) => {
    const cityname = req.query.cityName;

    try {
        const cities = await db.Hotel.findAll({
            where: {
                location: {
                    [Op.like]: `%${cityname}%`
                }
            },
            limit: 5
        });
     
        res.send({ cities: cities });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};




module.exports={createHotel, updateurl, search, handleCookie, handleCitySuggestion};