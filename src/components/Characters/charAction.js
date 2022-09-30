import { FETCH_CHAR_FAILURE, FETCH_CHAR_REUEST, FETCH_CHAR_SUCCESS, FETCH_CHAR_RELATED, EMPTY_CHAR_RELATED } from "../../redux/types"
import axios from 'axios'
import { emptyArray, emptyFilmRelatedArray, fetchFilms, fetchRelatedFilmsFromOthers } from "../Films/filmAction"
import { emptyVehicleRelatedArray, fetchRelatedVehicleFromOthers, fetchVehicles } from "../Vehicles/vehicleAction"
import { emptyStarshipRelatedArray, fetchRelatedStarshipsFromOthers, fetchStarships } from "../Starships/starshipAction"

export const fetchCharRequest = () => {
    return {
        type: FETCH_CHAR_REUEST
    }
}

export const fetchCharSuccess = (users) => {
    return {
        type: FETCH_CHAR_SUCCESS,
        payload: users,
    }
}

export const fetchCharFailure = (error) => {
    return {
        type: FETCH_CHAR_FAILURE,
        payload: error,
    }
}

export const fetchCharRelated = (relatedData) => {
    return {
        type: FETCH_CHAR_RELATED,
        payload: relatedData
    }
}

// empty char related array
export const emptyCharRelatedArray = () => {
    return {
        type: EMPTY_CHAR_RELATED,
    }
}


export const fetchRelatedUserFromOther = (charId) => {
    return (dispatch) => {
        dispatch(fetchCharRequest())
        axios
            .get(`https://swapi.dev/api/people/${charId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchCharSuccess(users))
                dispatch(fetchCharRelated(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchCharFailure(errMsg))
            })
    }
}

export const fetchUsers = (charId) => {
    return (dispatch) => {
        dispatch(fetchCharRequest())
        axios
            .get(`https://swapi.dev/api/people/${charId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchCharSuccess(users))
                dispatch(fetchCharRelated(users))

                //Related Film array getting clean
                dispatch(emptyFilmRelatedArray())
                users.films?.forEach(film => dispatch(fetchRelatedFilmsFromOthers(film.split('/').at(-2))))

                //Related Vehicle array getting clean
                dispatch(emptyVehicleRelatedArray())
                users.vehicles?.forEach(vehicle => dispatch(fetchRelatedVehicleFromOthers(vehicle.split('/').at(-2))))

                //Related Starships array getting clean
                dispatch(emptyStarshipRelatedArray())
                users.starships?.forEach(starship => dispatch(fetchRelatedStarshipsFromOthers(starship.split('/').at(-2))))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchCharFailure(errMsg))
            })
    }
}