let { Task } = require('../schema/taskschema')
let { User } = require('../schema/userschema')
let joi = require('joi')

async function check(data) {
    let schema = joi.object({
        taskname: joi.string().required(),
        description: joi.string().required(),
    })
    let valid = await schema.validateAsync(data, { abortEarly: false }).catch((error) => {
        return { error }
    })
    if (!valid || (valid && valid.error)) {
        let msg = []
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid }
}

async function create(params, userData) {
    let valid = await check(params).catch((error) => {
        return { error }
    })
    if (!valid || (valid && valid.error)) {
        return { error: valid.error }
    }
    let finduser = await User.findOne({ where: { id: userData.id } }).catch((error) => {
        return { error }
    })
    if (!finduser || (finduser && finduser.error)) {
        return { error: "already exist " }
    }
    let taskdata = {
        taskname: params.taskname,
        description: params.description,
        createdby: userData.id,
        updatedby: userData.id
    }
    let data = await Task.create(taskdata).catch((error) => {
        return { error }
    })
    if (!data || (data && data.error)) {
        return { error: data.error }
    }
    return { data }
}
async function viewAll(permission) {
    let where = {}
    console.log(permission)
    let restore = permission.task_restore
    if (!restore) {
        where = { is_deleted: false }
    }
    let data = await Task.findAll({ where }).catch((error) => {
        return { error }
    })
    console.log(data)
    if (!data || (data && data.error)) {
        return { error: data.error }
    }
    return { data }
}
async function checkR(data) {
    let schema = joi.object({
        id: joi.number().required()
    })
    let valid = await schema.validateAsync(data, { abortEarly: false }).catch((error) => {
        return { error }
    })
    if (!valid || (valid && valid.error)) {
        let msg = []
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid }
}

async function viewOne(id) {
    let valid = await checkR({ id }).catch((error) => {
        return { error }
    })
    if (!valid || (valid && valid.error)) {
        return { error: valid.error }
    }
    let data = await Task.findOne({ where: { id } }).catch((error) => {
        return { error }
    })
    if (!data || (data && data.error)) {
        return { error: data.error }
    }
    return { data }
}

async function checkU(data) {
    let schema = joi.object({
        taskname: joi.string().required(),
        description: joi.string().required()
    })
    let valid = await schema.validateAsync(data, { abortEarly: false }).catch((error) => {
        return { error }
    })
    if (!valid || (valid && valid.error)) {
        let msg = []
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid }
}
async function update(id, params, userData) {
    console.log(params)
    let valid = await checkU(params).catch((error) => {
        return { error }
    })
    if (!valid || (valid && valid.error)) {
        console.log(valid)
        return { error: valid.error }
    }
    let data = {
        taskname: params.taskname,
        description: params.description,
        // status: params.status,
        updatedby: userData.id
    }
    let updata = await Task.update(data, { where: { id } }).catch((error) => {
        return { error }
    })
    if (!updata || (updata && updata.error)) {
        return { error: updata.error }
    }
    return { data }
}

async function tDelete(id, decision) {
    let valid = await checkR({ id }).catch((error) => {
        return { error }
    })
    if (!valid || (valid && valid.error)) {
        return { error: valid.error }
    }
    let findtask = await Task.findOne({ where: { id } }).catch((error) => {
        return { error }
    })
    if (!findtask || (findtask && findtask.error)) {
        return { error: findtask.error }
    }
    if (findtask.is_deleted == decision) {
        return { error: "task already deleted" }
    }
    let data = await Task.update({ is_deleted: decision }, { where: { id } }).catch((error) => {
        return { error }
    })
    if (!data || (data && data.error)) {
        return { error: data.error }
    }
    if (data <= 0) {
        return { error: "task not found" }
    }
    return { data: findtask }
}
module.exports = { create, viewAll, viewOne, update, tDelete }