import server from "../apis/server"
import history from "../history"
import { FETCH_LAND, SAVE_LAND, CREATE_LOG, CREATE_MANDAL, EDIT_MANDAL, FETCH_LOG, FETCH_MANDAL, FETCH_MONTH_LOG, PATCH_LOG, SIGN_IN, SIGN_OUT, GET_MANDAL, GET_FRIENDINFO, GET_USERLIST, GET_ALLMANDAL } from "../type"
import { getDateString, getYear, getMonthIndex, getDate } from "./getDateString"

// USERS

export const signIn = (userInfo) => async (dispatch) => {
    const [userId, email, name, imagePath] = userInfo
    const { data } = await server.post("/login/google", {
        userId,
        email,
        name,
        imagePath,
    })
    localStorage.setItem("id", data.id)
    dispatch({ type: SIGN_IN, payload: data })
}

export const signOut = () => {
    return {
        type: SIGN_OUT,
    }
}

// MANDALS

export const fetchMandal = (mandalId) => async (dispatch) => {
    const { data } = await server.get(`/mandal?id=${mandalId}`)
    dispatch({ type: FETCH_MANDAL, payload: data })
}

export const getAllMandal = () => async (dispatch) => {
    const { data } = await server.get(`/allmandal`)
    dispatch({ type: GET_ALLMANDAL, payload: data })
}

// USERS

export const getMandal = (userId) => async (dispatch) => {
    const { data } = await server.get(`/mandaluser?id=${userId}`)
    dispatch({ type: GET_MANDAL, payload: data })
}

export const getFriendInfo = (friendId) => async (dispatch) => {
    const { data } = await server.get(`/mandalplan/view?id=${friendId}`)
    dispatch({ type: GET_FRIENDINFO, payload: data })
}
export const getUserList = () => async (dispatch) => {
    const { data } = await server.get(`/userlist`)
    dispatch({ type: GET_USERLIST, payload: data })
}
export const createMandal = (mandalData, miniData) => async (dispatch) => {
    console.log("create Mandal request")
    const userId = localStorage.getItem("id")
    const { data } = await server.post("/mandal/create", { userId, mandalData, miniData })
    console.log("created")
    dispatch({ type: CREATE_MANDAL, payload: data })
    history.push(`/mandalart/${userId}/${data.mandal.id}`)
}

export const editMandal = (mandalId, mandalData, miniData) => async (dispatch) => {
    console.log("edit Mandal request")
    const { data } = await server.put("/mandal/edit", { mandalId, mandalData, miniData })
    console.log("edited")
    dispatch({ type: EDIT_MANDAL, payload: data })
    const userId = localStorage.getItem("id")
    history.push(`/mandalart/${userId}/${mandalId}`)
}

// CHECKLOGS

export const fetchLog = (userId, mandalId) => async (dispatch) => {
    const dateString = getDateString()
    const { data } = await server.get(`/checklog?mandalId=${mandalId}&date=${dateString}`)
    if (data.length === 0) await createLog(userId, mandalId)(dispatch)
    else dispatch({ type: FETCH_LOG, payload: data[0] })
}

export const fetchMonthLog = (month) => async (dispatch) => {
    const { data } = await server.get(`/checklogs?userId=${localStorage.getItem("id")}&month=${month}`)
    dispatch({ type: FETCH_MONTH_LOG, payload: data })
}

export const createLog = (userId, mandalId) => async (dispatch) => {
    const initial_log = {
        date: getDateString(),
        year: getYear(),
        month: getMonthIndex(),
        day: getDate(),
        checks: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        userId,
        mandalId,
    }
    const { data } = await server.post("/checklogs", { ...initial_log })
    dispatch({ type: CREATE_LOG, payload: data })
}

export const patchLog = (miniMandalIndex, goalIndex, check, state) => async (dispatch) => {
    const { checks, monthLog, ...others } = state
    checks[miniMandalIndex][goalIndex] = check
    const { data } = await server.put(`/checklogs`, { ...others, checks })
    dispatch({ type: PATCH_LOG, payload: data })
}

// SCENE
export const saveLand = (newCubes) => async (dispatch) => {
    console.log("saveLand request")
    console.log("new cubes:", newCubes)
    const userId = localStorage.getItem("id")
    const { data } = await server.put(`/lands`, { userId, newCubes })
    console.log(data)
    dispatch({ type: SAVE_LAND })
}

export const fetchLand = () => async (dispatch) => {
    console.log("fetchLand request")
    const userId = localStorage.getItem("id")
    const { data } = await server.get(`/lands?userId=${userId}`)
    console.log(data)
    dispatch({ type: FETCH_LAND, payload: data })
}
