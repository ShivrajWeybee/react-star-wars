import { FETCH_PLANET_FAILURE, FETCH_PLANET_REUEST, FETCH_PLANET_SUCCESS, FETCH_PLANET_RELATED, EMPTY_PLANET_RELATED } from "../../redux/types"
import axios from 'axios'
import { emptySpeciesRelatedArray, fetchRelatedSpeciesFromOthers } from "../Species/speciesAction"
import { emptyCharRelatedArray, fetchRelatedUserFromOther } from "../Characters/charAction"
import { emptyFilmRelatedArray, fetchRelatedFilmsFromOthers } from "../Films/filmAction"

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

export const fetchPlanetRelated = (relatedData) => {
    return {
        type: FETCH_PLANET_RELATED,
        payload: relatedData,
    }
}

export const emptyPlanetRelatedArray = () => {
    return {
        type: EMPTY_PLANET_RELATED,
    }
}


export const fetchRelatedPlanetsFromOthers = (planetId) => {
    return (dispatch) => {
        dispatch(fetchPlanetRequest)
        axios
            .get(`https://swapi.dev/api/planets/${planetId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchPlanetSuccess(users))
                dispatch(fetchPlanetRelated(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchPlanetFailure(errMsg))
            })
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
                dispatch(fetchPlanetRelated(users))

                //Related Films array getting clean
                dispatch(emptyFilmRelatedArray())
                users.films?.forEach(planet => dispatch(fetchRelatedFilmsFromOthers(planet.split('/').at(-2))))

                // Related Characters array getting clean
                dispatch(emptyCharRelatedArray())
                users.characters?.forEach(char => dispatch(fetchRelatedUserFromOther(char.split('/').at(-2))))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchPlanetFailure(errMsg))
            })
    }
}