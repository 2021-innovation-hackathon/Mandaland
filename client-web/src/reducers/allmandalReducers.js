import { GET_ALLMANDAL } from "../type"

const allmandalReducers = (state = [], action) => {
    switch (action.type) {
        case GET_ALLMANDAL:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default allmandalReducers
