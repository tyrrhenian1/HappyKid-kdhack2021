const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { Module } = require('module')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    parent_email: {type: DataTypes.STRING}
})

const Like = sequelize.define('like',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    category: {type: DataTypes.STRING}
})

User.hasMany(Like)
Like.belongsTo(User)


module.exports = {
    User,
    Like
}