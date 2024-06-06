import { describe, test, expect, vi, beforeAll } from 'vitest';
import axios from 'axios';

// Mock questions data
const mockQuestions = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    category: 'General',
    question_type: i % 3 === 0 ? 'text' : i % 3 === 1 ? 'multiple' : 'boolean',
    difficulty: 'easy',
    question: `Question ${i + 1}`,
    correct_answer: `Answer ${i + 1}`,
    incorrect_answers: [`Incorrect ${i + 1}a`, `Incorrect ${i + 1}b`, `Incorrect ${i + 1}c`],
}));

// Mock axios get method
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeAll(() => {
    mockedAxios.get.mockResolvedValue({ data: mockQuestions });
});

// The function to fetch and shuffle questions
const fetchQuestions = async (difficulty: string) => {
    const response = await axios.get<Question[]>('https://colters-quiz-api-6118b7b1799e.herokuapp.com/questions', {
        params: { difficulty },
    });
    return getRandomQuestions(response.data, 10, difficulty);
};

// The function to get random questions
const getRandomQuestions = (questions: Question[], count: number, difficulty: string): Question[] => {
    const filteredQuestions = questions.filter(question => question.difficulty === difficulty);
    const questionMap: { [key: number]: Question } = {};
    filteredQuestions.forEach(question => {
        questionMap[question.id] = question;
    });

    const uniqueQuestions = Object.values(questionMap);

    const groupedByType = uniqueQuestions.reduce((acc: { [key: string]: Question[] }, question) => {
        (acc[question.question_type] = acc[question.question_type] || []).push(question);
        return acc;
    }, {});

    const types = Object.keys(groupedByType);
    let selectedQuestions: Question[] = [];

    types.forEach(type => {
        selectedQuestions = selectedQuestions.concat(groupedByType[type].slice(0, 2));
    });

    const remainingCount = count - selectedQuestions.length;
    const remainingQuestions = uniqueQuestions.filter(
        question => !selectedQuestions.includes(question)
    );

    selectedQuestions = selectedQuestions.concat(
        remainingQuestions.sort(() => 0.5 - Math.random()).slice(0, remainingCount)
    );

    return selectedQuestions.sort(() => 0.5 - Math.random());
};

interface Question {
    id: number;
    category: string;
    question_type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

describe('fetchQuestions', () => {
    test('fetches and shuffles questions correctly', async () => {
        const questions = await fetchQuestions('easy');
        expect(questions).toHaveLength(10);

        const questionTypes = questions.reduce((acc: { [key: string]: number }, question) => {
            acc[question.question_type] = (acc[question.question_type] || 0) + 1;
            return acc;
        }, {});

        Object.values(questionTypes).forEach(count => {
            expect(count).toBeGreaterThanOrEqual(2);
        });
    });
});
