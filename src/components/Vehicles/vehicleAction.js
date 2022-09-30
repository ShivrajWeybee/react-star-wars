import { FETCH_VEHICLE_FAILURE, FETCH_VEHICLE_RELATED, FETCH_VEHICLE_REUEST, FETCH_VEHICLE_SUCCESS, EMPTY_VEHICLE_RELATED } from "../../redux/types"
import axios from 'axios'
import { emptySpeciesRelatedArray, fetchRelatedSpeciesFromOthers } from "../Species/speciesAction"
import { emptyFilmRelatedArray, fetchRelatedFilmsFromOthers } from "../Films/filmAction"

export const fetchVehicleRequest = () => {
    return {
        type: FETCH_VEHICLE_REUEST
    }
}

export const fetchVehicleSuccess = (users) => {
    return {
        type: FETCH_VEHICLE_SUCCESS,
        payload: users,
    }
}

export const fetchVehicleFailure = (error) => {
    return {
        type: FETCH_VEHICLE_FAILURE,
        payload: error,
    }
}

export const fetchVehicleRelated = (users) => {
    return {
        type: FETCH_VEHICLE_RELATED,
        payload: users,
    }
}

// empty vehicle related array
export const emptyVehicleRelatedArray = () => {
    return {
        type: EMPTY_VEHICLE_RELATED,
    }
}


export const fetchRelatedVehicleFromOthers = (vehicleId) => {
    return (dispatch) => {
        dispatch(fetchVehicleRequest())
        axios
            .get(`https://swapi.dev/api/vehicles/${vehicleId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchVehicleSuccess(users))
                dispatch(fetchVehicleRelated(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchVehicleFailure(errMsg))
            })
    }
}


export const fetchVehicles = (vehicleId) => {
    return (dispatch) => {
        dispatch(fetchVehicleRequest())
        axios
            .get(`https://swapi.dev/api/vehicles/${vehicleId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchVehicleSuccess(users))
                dispatch(fetchVehicleRelated(users))

                //Related Films array getting clean
                dispatch(emptyFilmRelatedArray())
                users.films?.forEach(specie => dispatch(fetchRelatedFilmsFromOthers(specie.split('/').at(-2))))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchVehicleFailure(errMsg))
            })
    }
}