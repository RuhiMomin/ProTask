let { sequelizeCon, Model, DataTypes, Op, QueryTypes } = require('../init/dbConfig')
let { User } = require('../schema/userschema')
let secure = require('../helper/security')
function authM(permission) {
    return async (req, res, next) => {
        let token = req.headers.token
        if (typeof (token) != "string") {
            return res.status(401).send('unauthorized')
        }
        let decrypt = await secure.decrypt(token, "#1234").catch((error) => {
            return { error }
        })
        if (!decrypt || (decrypt && decrypt.error)) {
            return res.status(401).send('unauthorized1')
        }
        let query = `select user.id,user.name,user.email,user.contact,permission.name as permission
        from user
        left  join userpermission on user.id=userpermission.user_id
        left join permission  on userpermission.permission_id=permission.id
        where user.id='${decrypt.id}'
        and token='${token}'`;
        let user = await sequelizeCon.query(query, { type: QueryTypes.SELECT }).catch((error) => {
            return { error }
        })
        if (!user || (user && user.error)) {
            return res.status(500).send(user.error)
        }
        let permiss = {}
        for (let i of user) {
            if (i.permission) {
                permiss[i.permission] = true
            }
        }
        if (permiss.length <= 0 || !permiss[permission]) {
            console.log("hello world")
            return res.status(401).send("not authorized")
        }
        req['userData'] = {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            contact: user[0].contact,
            permiss
        }
        next();
    }
}
module.exports = { authM }