import { CSSProperties } from 'react';
import { AtomProps } from './types';
import { parseAtomProps, styleToCss } from './utils';

const TEST_TOKENS = {
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
};

const TEST_ATOM_PROPS: AtomProps<typeof TEST_TOKENS> = {
  c: 'green.50',
  borderColor: 'black',
  flex: true,
  flexJustify: 'center',
  w: 500,
  h: '4',
  fontSize: 'md',
};

const TEST_ATOM_PROPS_RESULT: CSSProperties = {
  borderColor: '#000000',
  color: '#F0FFF4',
  display: 'flex',
  fontSize: '28rem',
  height: '1rem',
  justifyContent: 'center',
  width: '500px',
};

describe('parseAtomProps', () => {
  it('should parse style correctly', () => {
    const { style } = parseAtomProps(TEST_ATOM_PROPS, TEST_TOKENS);
    expect(style).toEqual(TEST_ATOM_PROPS_RESULT);
  });

  it('should parse pseudoClassStyle correctly', () => {
    const { pseudoClassStyle } = parseAtomProps({ $hover: TEST_ATOM_PROPS }, TEST_TOKENS);
    expect(pseudoClassStyle).toEqual({ hover: TEST_ATOM_PROPS_RESULT });
  });

  it('should parse pseudoElementStyle correctly', () => {
    const { pseudoElementStyle } = parseAtomProps({ $$after: TEST_ATOM_PROPS }, TEST_TOKENS);
    expect(pseudoElementStyle).toEqual({ after: TEST_ATOM_PROPS_RESULT });
  });

  it('should parse htmlProps correctly', () => {
    const { htmlProps } = parseAtomProps({ src: 'https://example.com' }, TEST_TOKENS);
    expect(htmlProps).toEqual({
      src: 'https://example.com',
    });
  });
});

describe('styleToCss', () => {
  it('should covert style to css correctly', () => {
    const css = styleToCss(TEST_ATOM_PROPS_RESULT);
    expect(css).toEqual(
      'border-color:#000000;color:#F0FFF4;display:flex;font-size:28rem;height:1rem;justify-content:center;width:500px;'
    );
  });
});
