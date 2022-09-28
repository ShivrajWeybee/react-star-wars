import { FETCH_STARSHIP_FAILURE, FETCH_STARSHIP_REUEST, FETCH_STARSHIP_SUCCESS } from "../../redux/types"
import axios from 'axios'

export const fetchStarshipRequest = () => {
    return {
        type: FETCH_STARSHIP_REUEST
    }
}

export const fetchStarshipSuccess = (users) => {
    return {
        type: FETCH_STARSHIP_SUCCESS,
        payload: users,
    }
}

export const fetchStarshipFailure = (error) => {
    return {
        type: FETCH_STARSHIP_FAILURE,
        payload: error,
    }
}

export const fetchStarships = (starshipId) => {
    return (dispatch) => {
        dispatch(fetchStarshipRequest)
        axios
            .get(`https://swapi.dev/api/starships/${starshipId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchStarshipSuccess(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchStarshipFailure(errMsg))
            })
    }
}