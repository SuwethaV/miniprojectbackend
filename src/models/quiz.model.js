import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Book from './Book.js';

const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id'
    }
  },
  questions: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

Book.hasMany(Quiz, { foreignKey: 'bookId' });
Quiz.belongsTo(Book, { foreignKey: 'bookId' });

export default Quiz;