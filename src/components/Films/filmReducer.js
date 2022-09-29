import { FETCH_FILM_FAILURE, FETCH_FILM_REUEST, FETCH_FILM_SUCCESS, FETCH_FILM_RELATED } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: [],
    related: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FILM_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_FILM_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_FILM_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload,
            }

        case FETCH_FILM_RELATED:
            return {
                ...state,
                loading: false,
                related: [...state.related, action.payload],
            }

        default: return state
    }
}

export default reducer