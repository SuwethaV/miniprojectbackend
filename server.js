// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import sequelize from './src/config/sequelize.js'
// import authRoutes from './src/routes/auth.routes.js'
// import User from './src/models/user.model.js'

// dotenv.config()

// const app = express()
// app.use(cors())
// app.use(express.json())

// app.use('/api/auth', authRoutes)

// const PORT = process.env.PORT || 5000
// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// })
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/config/sequelize.js';
import authRoutes from './src/routes/auth.routes.js';
import User from './src/models/user.model.js';
import Book from './src/models/book.model.js';
import Question from './src/models/question.model.js';
import quizRoutes from './src/routes/quiz.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Existing auth route
app.use('/api/auth', authRoutes);

// New genetic quiz route
app.use('/api/quiz', quizRoutes);

// Sync all models
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
