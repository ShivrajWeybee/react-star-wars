import { FETCH_CHAR_FAILURE, FETCH_CHAR_REUEST, FETCH_CHAR_SUCCESS, FETCH_CHAR_RELATED, EMPTY_CHAR_RELATED } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: [],
    related: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHAR_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_CHAR_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_CHAR_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload,
            }

        case FETCH_CHAR_RELATED:
            return {
                ...state,
                loading: false,
                related: [...state.related, action.payload]
            }

        case EMPTY_CHAR_RELATED:
            return {
                ...state,
                related: [],
            }

        default: return state
    }
}

export default reducer