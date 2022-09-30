import { FETCH_SPECIES_FAILURE, FETCH_SPECIES_REUEST, FETCH_SPECIES_SUCCESS, FETCH_SPECIES_RELATED, EMPTY_SPECIES_RELATED } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: [],
    related: [],
}

const speciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SPECIES_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_SPECIES_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_SPECIES_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload,
            }

        case FETCH_SPECIES_RELATED:
            return {
                ...state,
                loading: false,
                related: [...state.related, action.payload]

            }

        case EMPTY_SPECIES_RELATED:
            return {
                ...state,
                related: [],
            }

        default: return state
    }
}

export default speciesReducer