import { GET_FRIENDINFO } from "../type"

const INITIAL_STATE = {
    friends: [],
}

const friendinfoReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FRIENDINFO:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default friendinfoReducers
