let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
function encrypt(text, key) {
    return new Promise((res, rej) => {
        jwt.sign(text, key, (error, token) => {
            if (error) {
                return rej(error)
            }
            return res(token)
        })
    })
}
function decrypt(text, key) {
    return new Promise((res, rej) => {
        jwt.verify(text, key, (error, token) => {
            if (error) {
                return rej(error)
            }
            return res(token)
        })
    })
}
async function hash(ptext, salt = 10) {
    let encrypt = await bcrypt.hash(ptext, salt).catch((error) => {
        console.log(error)
    })
    if (!encrypt || (encrypt && encrypt.error)) {
        return { error: encrypt.error }
    }
    return { data: encrypt }
}
async function compare(ptext, et) {
    let check = await bcrypt.compare(ptext, et).catch((error) => {
        return { error }
    })
    if (!check || (check && check.error)) {
        return { error: check && check.error }
    }
    return { data: true }
}
module.exports = { encrypt, decrypt, hash, compare }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              