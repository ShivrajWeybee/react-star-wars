import { FETCH_API_REUEST, FETCH_API_SUCCESS, FETCH_API_FAILURE } from "./types";

const initialState = {
    loading: true,
    apiData: [],
    charData: [],
    error: '',
    page: 1,
}

const commanReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_API_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_API_SUCCESS:
            return {
                loading: false,
                apiData: action.payload,
                error: '',
                page: action.page
            }

        case FETCH_API_FAILURE:
            return {
                loading: false,
                apiData: [],
                error: action.payload,
            }

        default:
            return state
    }
}

export default commanReducer;