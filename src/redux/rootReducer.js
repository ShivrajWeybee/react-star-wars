import { combineReducers } from "redux";

import charReducer from "../components/Characters/charReducer";
import filmReducer from "../components/Films/filmReducer";
import planetReducer from "../components/Planets/planetReducer";
import speciesReducer from "../components/Species/speciesReducer";
import starshipReducer from "../components/Starships/starshipReducer";
import vehicleReducer from "../components/Vehicles/vehicleReducer";
import commanReducer from "./commanreducer";

const rootReducer = combineReducers({
    char: charReducer,
    film: filmReducer,
    planet: planetReducer,
    species: speciesReducer,
    starship: starshipReducer,
    vehicle: vehicleReducer,
    comman: commanReducer,
})

export default rootReducer