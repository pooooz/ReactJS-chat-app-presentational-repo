import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Message } from './Message';

const message = {
  id: '1',
  author: 'Test',
  text: 'Test',
};

describe('Message', () => {
  it('Render component', () => {
    render(<Message message={message} />);
  });

  it('Render with snapshot', () => {
    const { asFragment } = render(<Message message={message} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render component with author', () => {
    render(<Message message={message} />);
    expect(screen.getByText(/Author: <\w*>/)).toBeInTheDocument();
  });
});
