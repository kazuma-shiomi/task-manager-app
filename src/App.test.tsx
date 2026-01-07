import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'タスク管理' })).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<App />);
    expect(screen.getByLabelText('検索')).toBeInTheDocument();
  });

  it('renders the add button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument();
  });
});
