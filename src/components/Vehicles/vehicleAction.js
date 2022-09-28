import { FETCH_VEHICLE_FAILURE, FETCH_VEHICLE_REUEST, FETCH_VEHICLE_SUCCESS } from "../../redux/types"
import axios from 'axios'

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

export const fetchVehicles = (vehicleId) => {
    return (dispatch) => {
        dispatch(fetchVehicleRequest)
        axios
            .get(`https://swapi.dev/api/vehicles/${vehicleId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchVehicleSuccess(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchVehicleFailure(errMsg))
            })
    }
}