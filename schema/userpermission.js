let{sequelizeCon,Model,DataTypes,QueryTypes,Op}=require('../init/dbConfig')
let{User}=require('../schema/userschema')

class userPermission extends Model{}
userPermission.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    permission_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName:"userpermission",modelName:"userPermission",sequelize:sequelizeCon
})

module.exports={userPermission}