import { FETCH_VEHICLE_FAILURE, FETCH_VEHICLE_REUEST, FETCH_VEHICLE_SUCCESS } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: []
}

const vehicleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VEHICLE_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_VEHICLE_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_VEHICLE_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }

        default: return state
    }
}

export default vehicleReducer