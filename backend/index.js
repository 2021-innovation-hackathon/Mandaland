const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const db = require("./dbServer")
const countLogs = require("./countLogs")
const mandals = require("./mandals")

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get("/", (req, res) => {})

// USERS

app.post("/login/google", async (req, res) => {
    try {
        // db에서 조회해오고, 값이 있으면 그대로 리턴, 없으면 새로 삽입 후 삽입한 컬럼을 리턴;
        console.log(`POST /login/google`)
        const { data } = await db.get(`/users?userId=${req.body.userId}`)
        if (data.length > 0) {
            console.log("User exist")
            res.status("200").json(data).end() // 200 == success
        } else {
            console.log(`New user! Insert ${req.body.name} in users`)
            const { data } = await db.post("/users", req.body)
            res.status("201").json(data[0]).end() // 201 == created
        }
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})

// MANDALS

app.get("/mandal", async (req, res) => {
    try {
        console.log(`GET /mandal?id=${req.query.id}`)
        const mandal = await db.get(`/mandals/${req.query.id}`)
        const miniMandals = await db.get(`/minimandals?mandalId=${req.query.id}`)
        const data = {
            mandal: mandal.data,
            miniMandals: miniMandals.data,
        }
        res.status("200").json(data).end() // 200 == success
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})
app.get("/mandaluser", async (req, res) => {
    try {
        console.log(`GET /mandals?userId=${req.query.id}`)
        const mandal = await db.get(`/mandals/?userId=${req.query.id}`)
        // const miniMandals = await db.get(`/minimandals?mandalId=${req.query.id}`)
        const data = {
            mandalarts: mandal.data,
            // miniMandals: miniMandals.data,
        }
        res.status("200").json(data).end() // 200 == success
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})
app.get("/mandalplan/view", async (req, res) => {
    try {
        console.log(`GET /users?userId=${req.query.id}`)
        const mandal = await db.get(`/users?id=${req.query.id}`)
        // const miniMandals = await db.get(`/minimandals?mandalId=${req.query.id}`)
        console.log(mandal)
        const data = {
            friends: mandal.data,
            // miniMandals: miniMandals.data,
        }
        res.status("200").json(data).end() // 200 == success
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})

app.post("/mandal/create", async (req, res) => {
    try {
        console.log("POST /mandal/create")
        const mandalInitialData = mandals.initiateMandal(req.body.userId, req.body.mandalData)
        const mandalData = await db.post(`/mandals`, mandalInitialData)
        const miniDatas = mandals.initiateMini(req.body.userId, mandalData.data.id, req.body.miniData)
        const promises = miniDatas.map(async (data) => {
            return await db.post("/minimandals", data).then((res) => res.data)
        })
        const miniMandals = await Promise.all(promises)
        const miniIds = miniMandals.map((miniMandal) => miniMandal.id)
        const mandal = await db.patch(`/mandals/${mandalData.data.id}`, { ...mandalData.data, miniIds })
        const data = {
            mandal: mandal.data,
            miniMandals,
        }
        res.status("201").json(data).end() // 201 == createdr
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})

app.put("/mandal/edit", async (req, res) => {
    try {
        console.log("PATCH /mandal/create")
        const mandal = await db.patch(`/mandals/${req.body.mandalId}`, req.body.mandalData)

        const miniDatas = mandals.initiateMiniEdit(mandal.data.miniIds, req.body.miniData)

        const promises = miniDatas.map(async (mini) => {
            return await db.patch(`/minimandals/${mini.id}`, mini.edit_data).then((res) => res.data)
        })

        const miniMandals = await Promise.all(promises)
        const data = {
            mandal: mandal.data,
            miniMandals,
        }
        res.status("200").json(data).end()
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})

// CHECKLOGS

app.get("/checklog", async (req, res) => {
    try {
        console.log(`GET /checklog?mandalId=${req.query.mandalId}&date=${req.query.date}`)
        const { data } = await db.get(`/checklogs?mandalId=${req.query.mandalId}&date=${req.query.date}`)
        res.status("200").json(data).end() // 200 == success
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})

app.get("/checklogs", async (req, res) => {
    try {
        console.log(`GET /checklogs?userId=${req.query.userId}&month=${req.query.month}`)
        const { data } = await db.get(`/checklogs?userId=${req.query.userId}&month=${req.query.month}`)
        const result = new Array(31).fill(0)
        data.forEach((row) => {
            result[row.day] += countLogs.countLogsByDay(row.checks)
        })
        res.status("200").json(result).end()
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})

app.post("/checklogs", async (req, res) => {
    try {
        console.log(`POST /checklog`)
        const { data } = await db.post("/checklogs", req.body)
        res.status("201").json(data).end() // 201 == created
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})

// 만다라트의 데이터를 체크할 때 체크 로그 수정하는 요청
app.put("/checklogs", async (req, res) => {
    try {
        console.log(`PATCH /checklogs`)
        const { data } = await db.patch(`/checklogs/${req.body.id}`, req.body)
        res.status("200").json(data).end()
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})

app.listen(4000, () => {
    console.log("Server is working on 4000")
})
