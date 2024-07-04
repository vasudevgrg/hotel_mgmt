const db= require("../models/index");

const Login=async (req, res)=>{
    const {username, password}= req.body;
    const hotel= await db.Hotel.findOne({
        where:{
            username: username
        }
    });

    if(hotel){
        res.cookie("hotel_id",hotel.id,{
            httpOnly:true,
            secure:false
        });
        res.send({message: "hotel owner Logged in successfully"});
    }else{
        const user=await db.Traveller.findOne({
         where:{
            username: username
         }
        });

        if(user){
            res.cookie("traveller_id", traveller.id, {
                httpOnly:true,
                secure:false
            });

            res.send({message: "Traveller Logged In successfully"});
        }else{
            res.status(401).send({message:"user doesnt exist"});
        }
    }
};

module.exports={Login}