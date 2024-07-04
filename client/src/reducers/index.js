import { combineReducers } from "redux";
import manageHotels from "./manageHotels";
import { manageHotelId } from "./manageHotelId";
import { manageShowModal } from "./manageShowModal";

const rootreducer= combineReducers({manageHotels, manageHotelId, manageShowModal});

export default rootreducer;