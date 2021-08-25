import { GET_MANDAL } from "../type"

const INITIAL_STATE = {
    mandalarts: [],
}

const mandalReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MANDAL:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default mandalReducers
