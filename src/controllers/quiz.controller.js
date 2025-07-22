import Book from '../models/Book.js';
import Quiz from '../models/Quiz.js';
import { generateQuizFromText } from '../utils/geneticQuizEngine.js';

export const createQuiz = async (req, res) => {
  const { bookId } = req.body;
  try {
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const questions = await generateQuizFromText(book.content);
    const quiz = await Quiz.create({ bookId, questions });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
};