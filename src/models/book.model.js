import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  }
});

export default Book;