const initiateMandal = (userId, mandalData) => {
    const data = { userId, ...mandalData, miniIds: [] }
    data.thumnailPath = data.thumnailPath ? data.thumnailPath : ""
    return data
}

const initiateMini = (userId, mandalId, miniData) => {
    let miniDatas = []
    for (let i = 0; i < 9; i++) miniDatas.push(new Array(9).fill(""))
    Object.keys(miniData).forEach((pair) => {
        const [i, j] = pair.split("-")
        miniDatas[i][j] = miniData[pair]
    })
    miniDatas = miniDatas.map((goals) => {
        const keyword = goals[4] ? goals[4] : ""
        return {
            keyword,
            goals,
            mandalId,
            userId,
        }
    })
    return miniDatas
}

const initiateMiniEdit = (miniIds, miniData) => {
    let miniDatas = []
    for (let i = 0; i < 9; i++) miniDatas.push(new Array(9).fill(""))
    Object.keys(miniData).forEach((pair) => {
        const [i, j] = pair.split("-")
        miniDatas[i][j] = miniData[pair]
    })
    miniDatas = miniDatas.map((goals, i) => {
        const keyword = goals[4] ? goals[4] : ""
        return {
            id: miniIds[i],
            edit_data: {
                keyword,
                goals,
            },
        }
    })
    return miniDatas
}

module.exports = mandals = {
    initiateMandal,
    initiateMini,
    initiateMiniEdit,
}
