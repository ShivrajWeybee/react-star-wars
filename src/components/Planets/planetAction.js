import { FETCH_PLANET_FAILURE, FETCH_PLANET_REUEST, FETCH_PLANET_SUCCESS } from "../../redux/types"
import axios from 'axios'

export const fetchPlanetRequest = () => {
    return {
        type: FETCH_PLANET_REUEST
    }
}

export const fetchPlanetSuccess = (users) => {
    return {
        type: FETCH_PLANET_SUCCESS,
        payload: users,
    }
}

export const fetchPlanetFailure = (error) => {
    return {
        type: FETCH_PLANET_FAILURE,
        payload: error,
    }
}

export const fetchPlanets = (planetId) => {
    return (dispatch) => {
        dispatch(fetchPlanetRequest)
        axios
            .get(`https://swapi.dev/api/planets/${planetId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchPlanetSuccess(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchPlanetFailure(errMsg))
            })
    }
}