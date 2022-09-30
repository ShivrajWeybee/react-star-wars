import { FETCH_STARSHIP_FAILURE, FETCH_STARSHIP_RELATED, FETCH_STARSHIP_REUEST, FETCH_STARSHIP_SUCCESS, EMPTY_STARSHIP_RELATED } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: [],
    related: [],
}

const starshipReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STARSHIP_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_STARSHIP_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_STARSHIP_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload,
            }

        case FETCH_STARSHIP_RELATED:
            return {
                ...state,
                loading: false,
                related: [...state.related, action.payload]
            }

        case EMPTY_STARSHIP_RELATED:
            return {
                ...state,
                related: [],
            }

        default: return state
    }
}

export default starshipReducer