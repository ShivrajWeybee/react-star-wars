import { FETCH_SPECIES_FAILURE, FETCH_SPECIES_REUEST, FETCH_SPECIES_SUCCESS, FETCH_SPECIES_RELATED, EMPTY_SPECIES_RELATED } from "../../redux/types"
import axios from 'axios'
import { emptyCharRelatedArray, fetchRelatedUserFromOther } from "../Characters/charAction"

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

// empty film related array
export const emptySpeciesRelatedArray = () => {
    return {
        type: EMPTY_SPECIES_RELATED,
    }
}


export const fetchRelatedSpeciesFromOthers = (speciesId) => {
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


export const fetchSpecies = (speciesId) => {
    return (dispatch) => {
        dispatch(fetchSpeciesRequest)
        axios
            .get(`https://swapi.dev/api/species/${speciesId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchSpeciesSuccess(users))
                dispatch(fetchSpeciesRelated(users))

                //Related Films array getting clean
                dispatch(emptySpeciesRelatedArray())
                users.species?.forEach(specie => dispatch(fetchRelatedSpeciesFromOthers(specie.split('/').at(-2))))

                //Related Characters array getting clean
                dispatch(emptyCharRelatedArray())
                users.people?.forEach(char => dispatch(fetchRelatedUserFromOther(char.split('/').at(-2))))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchSpeciesFailure(errMsg))
            })
    }
}