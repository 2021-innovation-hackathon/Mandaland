import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import userReducers from "./userReducers"
import mandalReducers from "./mandalReducers"
import logReducers from "./logReducers"
import mandalartsReducers from "./mandalartsReducers"
import friendinfoReducers from "./friendinfoReducers"
import landReducers from "./landReducers"
import userlistReducers from "./userlistReducers"
import allmandalReducers from "./allmandalReducers"

export default combineReducers({
    user: userReducers,
    mandal: mandalReducers,
    log: logReducers,
    mandalarts: mandalartsReducers,
    form: formReducer,
    friends: friendinfoReducers,
    land: landReducers,
    userlist: userlistReducers,
    allmandal: allmandalReducers,
})
