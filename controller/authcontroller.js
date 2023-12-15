let model = require('../model/authmodel')
async function userregister(req, res) {
    console.log(req.body)
    let modelData = await model.register(req.body).catch((error) => {
        return { error }
    })
    if (!modelData || (modelData && modelData.error)) {
        console.log(modelData)
        let error = (modelData && modelData.error) ? modelData.error : "internal server error"
        return res.send({ error })
    }
    return res.send({ data: modelData.data })
}
async function userlogin(req, res) {
    let modelData = await model.Login(req.body).catch((error) => {
        return { error }
    })
    if (!modelData || (modelData && modelData.error)) {
        let error = (modelData && modelData.error) ? modelData : "internal server error"
        return res.send({ error })
    }
    return res.header({ token: modelData.token }).send({ data: "login success" })
}

module.exports = { userregister, userlogin }