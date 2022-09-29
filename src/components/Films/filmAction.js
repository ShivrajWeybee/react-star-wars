import { FETCH_FILM_FAILURE, FETCH_FILM_RELATED, FETCH_FILM_REUEST, FETCH_FILM_SUCCESS } from "../../redux/types"
import axios from 'axios'

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

export const fetchFilms = (filmId) => {
    return (dispatch) => {
        dispatch(fetchFilmRequest)
        axios
            .get(`https://swapi.dev/api/films/${filmId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchFilmSuccess(users))
                dispatch(fetchFilmRelated(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchFilmFailure(errMsg))
            })
    }
}