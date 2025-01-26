import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '@/app/todo/page';

describe('TodoApp', () => {
    it('renders the input and add button', () => {
        render(<TodoApp />);
        expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
    });

    it('does not add a task if the input is empty', () => {
        render(<TodoApp />);
        const button = screen.getByText('Add');
        fireEvent.click(button);

        // The task list should remain empty
        const tasks = screen.queryAllByRole('listitem');
        expect(tasks.length).toBe(0);
    });

    it('trims whitespace before adding a task', () => {
        render(<TodoApp />);
        const input = screen.getByPlaceholderText('Add a new task...');
        const button = screen.getByText('Add');

        fireEvent.change(input, { target: { value: '   Test Task   ' } });
        fireEvent.click(button);

        // Task should be added without leading/trailing whitespace
        expect(screen.getByText('Test Task')).toBeInTheDocument();
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

    it('does not allow duplicate tasks', () => {
        render(<TodoApp />);
        const input = screen.getByPlaceholderText('Add a new task...');
        const button = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Test Task' } });
        fireEvent.click(button);

        fireEvent.change(input, { target: { value: 'Test Task' } });
        fireEvent.click(button);

        // Only one instance of the task should exist
        const tasks = screen.getAllByText('Test Task');
        expect(tasks.length).toBe(1);
    });

    it('handles multiple tasks being added, toggled, and deleted', () => {
        render(<TodoApp />);
        const input = screen.getByPlaceholderText('Add a new task...');
        const button = screen.getByText('Add');

        // Add multiple tasks
        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(button);

        fireEvent.change(input, { target: { value: 'Task 2' } });
        fireEvent.click(button);

        fireEvent.change(input, { target: { value: 'Task 3' } });
        fireEvent.click(button);

        // Ensure all tasks are added
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByText('Task 3')).toBeInTheDocument();

        // Toggle completion of Task 2
        const task2 = screen.getByText('Task 2');
        fireEvent.click(task2);
        expect(task2).toHaveClass('line-through text-gray-500');

        // Delete Task 1
        const deleteTask1 = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteTask1);
        expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    });
});

describe('TodoApp - onKeyDown Event', () => {
    it("adds a task when 'Enter' is pressed", () => {
        render(<TodoApp />);
        const input = screen.getByPlaceholderText('Add a new task...');
        const taskText = 'New Task';

        // Simulate typing in the input
        fireEvent.change(input, { target: { value: taskText } });

        // Simulate pressing 'Enter'
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        // Assert that the task is added
        expect(screen.getByText(taskText)).toBeInTheDocument();
    });

    it("does not add a task when a key other than 'Enter' is pressed", () => {
        render(<TodoApp />);
        const input = screen.getByPlaceholderText('Add a new task...');
        const taskText = 'Another Task';

        // Simulate typing in the input
        fireEvent.change(input, { target: { value: taskText } });

        // Simulate pressing 'Space'
        fireEvent.keyDown(input, { key: ' ', code: 'Space' });

        // Assert that the task is not added
        expect(screen.queryByText(taskText)).not.toBeInTheDocument();
    });
});
