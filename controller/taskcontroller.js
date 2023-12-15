let Model = require('../model/taskmodel')
async function create(req, res) {
    let modeldata = await Model.create(req.body, req.userData).catch((error) => {
        return { error }
    })
    console.log(modeldata, "wertyuiop");
    if (!modeldata || (modeldata && modeldata.error)) {
        let error = (modeldata && modeldata.error) ? modeldata.error : "internal server error"
        return res.send({ error: modeldata.error })
    }
    return res.send({ data: modeldata.data })
}
async function viewAll(req, res) {
    console.log(req.userData)
    let modeldata = await Model.viewAll(req.userData.permiss).catch((error) => {
        return { error }
    })
    if (!modeldata || (modeldata && modeldata.error)) {
        console.log(modeldata)
        let error = (modeldata && modeldata.error) ? modeldata.error : "internal server error"
        return res.send({ error: error })
    }
    return res.send({ data: modeldata.data })
}
async function viewOne(req, res) {
    let modeldata = await Model.viewOne(req.params.id).catch((error) => {
        return { error }
    })
    if (!modeldata || (modeldata && modeldata.error)) {
        let error = (modeldata && modeldata.error) ? modeldata.error : "internal server error"
        return res.send({ error: modeldata.error })
    }
    return res.send({ data: modeldata.data })
}
async function update(req, res) {
    console.log(req.body)
    let modeldata = await Model.update(req.params.id, req.body, req.userData).catch((error) => {
        return { error }
    })
    if (!modeldata || (modeldata && modeldata.error)) {
        let error = (modeldata && modeldata.error) ? modeldata.error : "internal server error"
        return res.send({ error: modeldata.error })
    }
    return res.send({ data: modeldata.data })
}
async function tDelete(req, res) {
    let modeldata = await Model.tDelete(req.params.id, true).catch((error) => {
        return { error }
    })
    if (!modeldata || (modeldata && modeldata.error)) {
        let error = (modeldata && modeldata.error) ? modeldata.error : "internal server error"
        return res.send({ error: modeldata.error })
    }
    return res.send({ data: modeldata.data })
}
async function restore(req, res) {
    let modeldata = await Model.tDelete(req.params.id, false).catch((error) => {
        return { error }
    })
    if (!modeldata || (modeldata && modeldata.error)) {
        let error = (modeldata && modeldata.error) ? modeldata.error : "internal server error"
        return res.send({ error: modeldata.error })
    }
    return res.send({ data: modeldata.data })
}
module.exports = { create, update, viewAll, viewOne, tDelete, restore }