/**
 * Seed A1-level questions for Vocabulary, Error Correction, and Sentence Transformation
 * These skills were missing A1 questions, causing adaptive testing issues for beginners.
 *
 * Run: npx ts-node src/prisma/seed-a1-questions.ts
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const VOCABULARY_A1 = [
  { q: 'What is the opposite of "hot"?', options: ['Cold', 'Warm', 'Cool', 'Big'], correct: 'Cold' },
  { q: 'What color is the sky on a sunny day?', options: ['Blue', 'Red', 'Green', 'Yellow'], correct: 'Blue' },
  { q: 'Which word means a place where you sleep?', options: ['Bedroom', 'Kitchen', 'Bathroom', 'Garden'], correct: 'Bedroom' },
  { q: 'What do you drink in the morning?', options: ['Coffee', 'Soap', 'Paper', 'Chair'], correct: 'Coffee' },
  { q: 'What is the opposite of "big"?', options: ['Small', 'Tall', 'Fast', 'Heavy'], correct: 'Small' },
  { q: 'Which one is a fruit?', options: ['Apple', 'Chair', 'Table', 'Book'], correct: 'Apple' },
  { q: 'What do you wear on your feet?', options: ['Shoes', 'Hat', 'Gloves', 'Scarf'], correct: 'Shoes' },
  { q: 'Which word means "mother and father"?', options: ['Parents', 'Friends', 'Teachers', 'Children'], correct: 'Parents' },
  { q: 'What is the opposite of "happy"?', options: ['Sad', 'Angry', 'Tired', 'Hungry'], correct: 'Sad' },
  { q: 'Which animal says "meow"?', options: ['Cat', 'Dog', 'Bird', 'Fish'], correct: 'Cat' },
  { q: 'What day comes after Monday?', options: ['Tuesday', 'Wednesday', 'Sunday', 'Friday'], correct: 'Tuesday' },
  { q: 'Which word means "not old"?', options: ['Young', 'Tall', 'Short', 'Heavy'], correct: 'Young' },
  { q: 'What do you use to write?', options: ['Pen', 'Cup', 'Plate', 'Bag'], correct: 'Pen' },
  { q: 'What is the number after 10?', options: ['Eleven', 'Nine', 'Twelve', 'Ten'], correct: 'Eleven' },
  { q: 'Which word means "very good"?', options: ['Excellent', 'Terrible', 'Boring', 'Difficult'], correct: 'Excellent' },
]

const ERROR_CORRECTION_A1 = [
  { q: 'Find and correct the error: "She have a cat."', correct: 'She has a cat.' },
  { q: 'Find and correct the error: "I is happy."', correct: 'I am happy.' },
  { q: 'Find and correct the error: "He go to school."', correct: 'He goes to school.' },
  { q: 'Find and correct the error: "They is my friends."', correct: 'They are my friends.' },
  { q: 'Find and correct the error: "She like pizza."', correct: 'She likes pizza.' },
  { q: 'Find and correct the error: "I has a dog."', correct: 'I have a dog.' },
  { q: 'Find and correct the error: "We is students."', correct: 'We are students.' },
  { q: 'Find and correct the error: "He are tall."', correct: 'He is tall.' },
  { q: 'Find and correct the error: "She don\'t like milk."', correct: "She doesn't like milk." },
  { q: 'Find and correct the error: "It are a book."', correct: 'It is a book.' },
]

const SENTENCE_TRANSFORMATION_A1 = [
  { q: 'Make this negative: "I like coffee."', correct: "I don't like coffee.|I do not like coffee." },
  { q: 'Make this a question: "She is a teacher."', correct: 'Is she a teacher?' },
  { q: 'Make this negative: "He is happy."', correct: "He isn't happy.|He is not happy." },
  { q: 'Make this a question: "They are students."', correct: 'Are they students?' },
  { q: 'Make this negative: "We have a car."', correct: "We don't have a car.|We do not have a car." },
  { q: 'Make this a question: "He likes pizza."', correct: 'Does he like pizza?' },
  { q: 'Make this negative: "She can swim."', correct: "She can't swim.|She cannot swim." },
  { q: 'Make this a question: "You are from Italy."', correct: 'Are you from Italy?' },
  { q: 'Make this negative: "They play football."', correct: "They don't play football.|They do not play football." },
  { q: 'Make this a question: "It is a dog."', correct: 'Is it a dog?' },
]

async function seed() {
  console.log('Seeding A1 questions for missing skills...')

  let count = 0

  // Vocabulary A1
  for (const [i, v] of VOCABULARY_A1.entries()) {
    await prisma.assessmentQuestion.create({
      data: {
        language: 'English',
        cefrLevel: 'A1',
        skill: 'VOCABULARY',
        questionType: 'MULTIPLE_CHOICE',
        questionText: v.q,
        options: v.options.map(o => ({ label: o, value: o })),
        correctAnswer: v.correct,
        points: 1,
        orderIndex: i,
        isActive: true,
        difficulty: 0.3,
      }
    })
    count++
  }

  // Error Correction A1
  for (const [i, ec] of ERROR_CORRECTION_A1.entries()) {
    await prisma.assessmentQuestion.create({
      data: {
        language: 'English',
        cefrLevel: 'A1',
        skill: 'ERROR_CORRECTION',
        questionType: 'ERROR_CORRECTION',
        questionText: ec.q,
        correctAnswer: ec.correct,
        points: 1,
        orderIndex: i,
        isActive: true,
        difficulty: 0.3,
      }
    })
    count++
  }

  // Sentence Transformation A1
  for (const [i, st] of SENTENCE_TRANSFORMATION_A1.entries()) {
    await prisma.assessmentQuestion.create({
      data: {
        language: 'English',
        cefrLevel: 'A1',
        skill: 'SENTENCE_TRANSFORMATION',
        questionType: 'SENTENCE_TRANSFORMATION',
        questionText: st.q,
        correctAnswer: st.correct,
        points: 1,
        orderIndex: i,
        isActive: true,
        difficulty: 0.3,
      }
    })
    count++
  }

  console.log(`Seeded ${count} A1 questions successfully.`)
  await prisma.$disconnect()
}

seed().catch(e => {
  console.error(e)
  prisma.$disconnect()
  process.exit(1)
})
