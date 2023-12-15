let { sequelizeCon, Model, DataTypes, QueryTypes, Op } = require('../init/dbConfig')
class Task extends Model { }

Task.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    taskname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assingTo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdby: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    updatedby: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { tableName: "task", modelName: "Task", sequelize: sequelizeCon })

module.exports = { Task }