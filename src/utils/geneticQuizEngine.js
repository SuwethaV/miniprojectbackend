import natural from 'natural';
import _ from 'lodash';

export const generateQuizFromText = async (text) => {
  const tokenizer = new natural.SentenceTokenizer();
  const sentences = tokenizer.tokenize(text);

  // Step 1: Initial population (randomly select sentences as questions)
  let population = _.sampleSize(sentences, 20).map((s) => ({ question: s, fitness: 0 }));

  for (let gen = 0; gen < 50; gen++) {
    // Step 2: Evaluate fitness (longer and informative sentences get higher fitness)
    population.forEach(individual => {
      individual.fitness = individual.question.length;
    });

    // Step 3: Selection
    const matingPool = _.orderBy(population, ['fitness'], ['desc']).slice(0, 10);

    // Step 4: Crossover
    const offspring = [];
    for (let i = 0; i < matingPool.length - 1; i++) {
      const q1 = matingPool[i].question;
      const q2 = matingPool[i + 1].question;
      const crossoverPoint = Math.floor(Math.min(q1.length, q2.length) / 2);
      const child = q1.slice(0, crossoverPoint) + q2.slice(crossoverPoint);
      offspring.push({ question: child, fitness: 0 });
    }

    // Step 5: Mutation
    offspring.forEach(ind => {
      if (Math.random() < 0.1) {
        ind.question = _.shuffle(ind.question.split(' ')).join(' ');
      }
    });

    population = [...matingPool, ...offspring];
  }

  const finalQuestions = population.slice(0, 10).map((q, index) => ({ id: index + 1, question: q.question, options: [], answer: '' }));
  return finalQuestions;
};
