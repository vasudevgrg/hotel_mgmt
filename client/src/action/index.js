
export const hotels=(payload)=>{
    return{
        type:"hotels",
        payload:payload

    }
};

export const showModal=(payload)=>{
    return {
        type:"showModal",
        payload:payload
    }
}

export const hotelId=(payload)=>{
    return {
        type:"hotelId",
        payload:payload
    }
}