import { FETCH_STARSHIP_FAILURE, FETCH_STARSHIP_REUEST, FETCH_STARSHIP_SUCCESS, FETCH_STARSHIP_RELATED, EMPTY_STARSHIP_RELATED } from "../../redux/types"
import axios from 'axios'
import { emptySpeciesRelatedArray, fetchRelatedSpeciesFromOthers } from "../Species/speciesAction"
import { emptyFilmRelatedArray, fetchRelatedFilmsFromOthers } from "../Films/filmAction"

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

export const fetchStarshipRelated = (relatedData) => {
    return {
        type: FETCH_STARSHIP_RELATED,
        payload: relatedData,
    }
}

// empty starship related array
export const emptyStarshipRelatedArray = () => {
    return {
        type: EMPTY_STARSHIP_RELATED,
    }
}


export const fetchRelatedStarshipsFromOthers = (starshipId) => {
    return (dispatch) => {
        dispatch(fetchStarshipRequest)
        axios
            .get(`https://swapi.dev/api/starships/${starshipId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchStarshipSuccess(users))
                dispatch(fetchStarshipRelated(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchStarshipFailure(errMsg))
            })
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
                dispatch(fetchStarshipRelated(users))

                //Related Films array getting clean
                dispatch(emptyFilmRelatedArray())
                users.films?.forEach(specie => dispatch(fetchRelatedFilmsFromOthers(specie.split('/').at(-2))))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchStarshipFailure(errMsg))
            })
    }
}