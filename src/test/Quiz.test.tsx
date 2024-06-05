import { describe, test, expect } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quiz from '../components/Quiz';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
(global as any).window = dom.window;
(global as any).document = dom.window.document;
(global as any).navigator = dom.window.navigator;

describe('Quiz Component', () => {
    test('renders loading state', async () => {
        render(<Quiz />);
        const loadingElement = screen.getByText(/loading/i);
        expect(loadingElement).toBeTruthy();
    });

    test('renders error state', async () => {
        // Mock fetch to simulate an error
        global.fetch = () =>
            Promise.reject(new Error('Failed to fetch questions'));

        render(<Quiz />);
        const errorElement = await screen.findByText(/failed to fetch questions/i);
        expect(errorElement).toBeTruthy();
    });

    test('renders quiz form', async () => {
        // Mock successful fetch response
        global.fetch = () =>
            Promise.resolve({
                json: () =>
                    Promise.resolve([
                        {
                            id: 1,
                            category: 'Test Category',
                            question_type: 'text',
                            difficulty: 'easy',
                            question: 'Test Question',
                            correct_answer: 'Test Answer',
                            incorrect_answers: [],
                        },
                    ]),
            } as unknown as Response); // Casting to Response type

        render(<Quiz />);
        const questionElement = await screen.findByText(/test question/i);
        expect(questionElement).toBeTruthy();
        const submitButton = screen.getByRole('button', { name: /next/i });
        expect(submitButton).toBeTruthy();
    });

    test('handles next button click', async () => {
        // Mock successful fetch response
        global.fetch = () =>
            Promise.resolve({
                json: () =>
                    Promise.resolve([
                        {
                            id: 1,
                            category: 'Test Category',
                            question_type: 'text',
                            difficulty: 'easy',
                            question: 'Test Question',
                            correct_answer: 'Test Answer',
                            incorrect_answers: [],
                        },
                    ]),
            } as unknown as Response); // Casting to Response type

        render(<Quiz />);
        const submitButton = await screen.findByRole('button', { name: /next/i });
        userEvent.click(submitButton);
        await waitFor(() => expect(screen.getByText(/name your entry/i)).toBeTruthy());
    });

    // You can write more tests for different scenarios, like submitting answers, handling result state, etc.
});
