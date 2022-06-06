import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './Input';

describe('Input', () => {
  const changeHandler = jest.fn();

  it('Render component', () => {
    render(<Input value="Render test" change={changeHandler} />);
  });

  it('Render with snapshot', () => {
    const { asFragment } = render(
      <Input value="Test" change={changeHandler} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Multiple render', () => {
    render(
      <>
        <Input value="Test" change={changeHandler} />
        <Input value="Test" change={changeHandler} />
      </>
    );
    expect(screen.getAllByRole('textbox').length).toBe(2);
  });

  it('Render with value and change handler', () => {
    render(<Input value="Test" change={changeHandler} />);
    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: 'Test' },
    });
    expect(screen.getByDisplayValue(/Test/)).toBeInTheDocument();
  });
});
