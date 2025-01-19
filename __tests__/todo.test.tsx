import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '@/app/todo/page';

describe('TodoApp', () => {
    it('renders the input and add button', () => {
        render(<TodoApp />);
        expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
    });

    it('allows a user to add a new task', () => {
        render(<TodoApp />);
        const input = screen.getByPlaceholderText('Add a new task...');
        const button = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Test Task' } });
        fireEvent.click(button);

        expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    it('allows a user to mark a task as completed', () => {
        render(<TodoApp />);

        // Add a new task
        const input = screen.getByPlaceholderText('Add a new task...');
        const button = screen.getByText('Add');
        fireEvent.change(input, { target: { value: 'Test Task' } });
        fireEvent.click(button);

        // Find the task and toggle completion
        const task = screen.getByText('Test Task');
        fireEvent.click(task);

        // Assert the class name for completed tasks
        expect(task).toHaveClass('line-through text-gray-500');
    });


    it('allows a user to delete a task', () => {
        render(<TodoApp />);
        const input = screen.getByPlaceholderText('Add a new task...');
        const button = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Test Task' } });
        fireEvent.click(button);

        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);

        expect(screen.queryByText('Test Task')).not.toBeInTheDocument();
    });
});
