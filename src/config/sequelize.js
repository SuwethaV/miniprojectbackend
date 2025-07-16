import { Sequelize } from 'sequelize'
import config from '../config/config.js'


const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect
  }
)

export default sequelize
