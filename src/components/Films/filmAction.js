import { FETCH_FILM_FAILURE, FETCH_FILM_RELATED, FETCH_FILM_REUEST, FETCH_FILM_SUCCESS, EMPTY_FILM_RELATED } from "../../redux/types"
import axios from 'axios'
import { emptyCharArray, emptyCharRelatedArray, fetchRelatedUserFromOther, fetchUsers } from "../Characters/charAction"
import { emptySpeciesRelatedArray, fetchRelatedSpeciesFromOthers, fetchSpecies } from "../Species/speciesAction"
import { emptyPlanetRelatedArray, fetchPlanets, fetchRelatedPlanetsFromOthers } from "../Planets/planetAction"
import { emptyVehicleRelatedArray, fetchRelatedVehicleFromOthers, fetchVehicles } from "../Vehicles/vehicleAction"
import { emptyStarshipRelatedArray, fetchRelatedStarshipsFromOthers, fetchStarships } from "../Starships/starshipAction"

export const fetchFilmRequest = () => {
    return {
        type: FETCH_FILM_REUEST
    }
}

export const fetchFilmSuccess = (users) => {
    return {
        type: FETCH_FILM_SUCCESS,
        payload: users,
    }
}

export const fetchFilmFailure = (error) => {
    return {
        type: FETCH_FILM_FAILURE,
        payload: error,
    }
}

export const fetchFilmRelated = (relatedData) => {
    return {
        type: FETCH_FILM_RELATED,
        payload: relatedData,
    }
}

// empty film related array
export const emptyFilmRelatedArray = () => {
    return {
        type: EMPTY_FILM_RELATED,
    }
}


export const fetchRelatedFilmsFromOthers = (filmId) => {
    return (dispatch) => {
        dispatch(fetchFilmRequest())
        axios
            .get(`https://swapi.dev/api/films/${filmId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchFilmRequest(users))
                dispatch(fetchFilmRelated(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchFilmFailure(errMsg))
            })
    }
}

export const fetchFilms = (filmId) => {
    return (dispatch) => {
        dispatch(fetchFilmRequest())
        axios
            .get(`https://swapi.dev/api/films/${filmId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchFilmSuccess(users))
                dispatch(fetchFilmRelated(users))

                // Related Characters array getting clean
                dispatch(emptyCharRelatedArray())
                users.characters?.forEach(char => dispatch(fetchRelatedUserFromOther(char.split('/').at(-2))))

                //Related Species array getting clean
                dispatch(emptySpeciesRelatedArray())
                users.species?.forEach(specie => dispatch(fetchRelatedSpeciesFromOthers(specie.split('/').at(-2))))

                //Related Planets array getting clean
                dispatch(emptyPlanetRelatedArray())
                users.planets?.forEach(planet => dispatch(fetchRelatedPlanetsFromOthers(planet.split('/').at(-2))))

                //Related Vehicle array gettig clean
                dispatch(emptyVehicleRelatedArray())
                users.vehicles?.forEach(vehicle => dispatch(fetchRelatedVehicleFromOthers(vehicle.split('/').at(-2))))

                //Related Starship array getting clean
                dispatch(emptyStarshipRelatedArray())
                users.starships?.forEach(starship => dispatch(fetchRelatedStarshipsFromOthers(starship.split('/').at(-2))))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchFilmFailure(errMsg))
            })
    }
}