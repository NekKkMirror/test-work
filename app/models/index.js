const config = require('../config/db.config.js')

const SequelizeDeclaration = require('sequelize')
const sequelize = new SequelizeDeclaration(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})

const db = {}

db.SequelizeDeclaration = SequelizeDeclaration
db.sequelize = sequelize

db.user = require('../models/user.model.js')(sequelize, SequelizeDeclaration)
db.refreshToken = require('../models/refreshToken.model.js')(sequelize, SequelizeDeclaration)
db.file = require('../models/file.model')(sequelize, SequelizeDeclaration)

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
})
db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId',
  targetKey: 'id',
})

db.file.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id'
})
db.user.hasOne(db.file, {
  foreignKey: 'userId',
  targetKey: 'id'
})

module.exports = db
