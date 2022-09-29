import { FETCH_SPECIES_FAILURE, FETCH_SPECIES_REUEST, FETCH_SPECIES_SUCCESS, FETCH_SPECIES_RELATED } from "../../redux/types"
import axios from 'axios'

export const fetchSpeciesRequest = () => {
    return {
        type: FETCH_SPECIES_REUEST
    }
}

export const fetchSpeciesSuccess = (users) => {
    return {
        type: FETCH_SPECIES_SUCCESS,
        payload: users,
    }
}

export const fetchSpeciesFailure = (error) => {
    return {
        type: FETCH_SPECIES_FAILURE,
        payload: error,
    }
}

export const fetchSpeciesRelated = (relatedData) => {
    return {
        type: FETCH_SPECIES_RELATED,
        payload: relatedData
    }
}

export const fetchSpecies = (speciesId) => {
    return (dispatch) => {
        dispatch(fetchSpeciesRequest)
        axios
            .get(`https://swapi.dev/api/species/${speciesId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchSpeciesSuccess(users))
                dispatch(fetchSpeciesRelated(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchSpeciesFailure(errMsg))
            })
    }
}