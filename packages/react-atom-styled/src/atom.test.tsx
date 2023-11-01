import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { atom } from './atom';

const Atom = atom({
  color: {
    black: '#000000',
    white: '#FFFFFF',
    green: {
      50: '#F0FFF4',
      100: '#C6F6D5',
      200: '#9AE6B4',
    },
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
  },
  fontSize: {
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
  },
});

describe('atom', () => {
  it('Atom component render correctly', () => {
    const { container } = render(
      <Atom as="span" c="green.50" width={500} height="4" fontSize="sm" $hover={{ c: 'white' }} $$after={{ w: '4' }} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
