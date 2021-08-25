import { GET_USERLIST } from "../type"

const mandalReducers = (state = [], action) => {
    switch (action.type) {
        case GET_USERLIST:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default mandalReducers
