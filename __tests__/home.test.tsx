import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

describe('Home', () => {
    it('renders the welcome message', () => {
        render(<Home />);
        expect(screen.getByText('Welcome to My Next.js App')).toBeInTheDocument();
    });

    it('renders the link to the To-Do List', () => {
        render(<Home />);
        const todoLink = screen.getByText('Go to To-Do List');
        expect(todoLink).toBeInTheDocument();
        expect(todoLink).toHaveAttribute('href', '/todo');
    });

    it('renders the footer links with images', () => {
        render(<Home />);

        const learnLink = screen.getByText('Learn');
        const examplesLink = screen.getByText('Examples');
        const nextJsLink = screen.getByText('Go to nextjs.org →');

        expect(learnLink).toBeInTheDocument();
        expect(learnLink).toHaveAttribute('href', expect.stringContaining('https://nextjs.org/learn'));

        expect(examplesLink).toBeInTheDocument();
        expect(examplesLink).toHaveAttribute('href', expect.stringContaining('https://vercel.com/templates'));

        expect(nextJsLink).toBeInTheDocument();
        expect(nextJsLink).toHaveAttribute('href', expect.stringContaining('https://nextjs.org'));
    });

    it('renders all images with correct attributes', () => {
        render(<Home />);

        const images = screen.getAllByRole('img', { hidden: true });
        expect(images).toHaveLength(3); // Assuming there are 3 images in the component
        expect(images[0]).toHaveAttribute('src', '/file.svg');
        expect(images[0]).toHaveAttribute('alt', 'File icon');
        expect(images[1]).toHaveAttribute('src', '/window.svg');
        expect(images[1]).toHaveAttribute('alt', 'Window icon');
        expect(images[2]).toHaveAttribute('src', '/globe.svg');
        expect(images[2]).toHaveAttribute('alt', 'Globe icon');
    });
});
