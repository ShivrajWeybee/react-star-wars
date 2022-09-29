import { FETCH_PLANET_FAILURE, FETCH_PLANET_REUEST, FETCH_PLANET_SUCCESS, FETCH_PLANET_RELATED } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: [],
    related: []
}

const planetReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLANET_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_PLANET_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_PLANET_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload,
            }

        case FETCH_PLANET_RELATED:
            return {
                ...state,
                related: [...state.related, action.payload]
            }

        default: return state
    }
}

export default planetReducer