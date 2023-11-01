import { remToPx, extendTokens } from './utils';

describe('remToPx', () => {
  it('should convert rem to px correctly', () => {
    const result = remToPx(
      {
        spacing: {
          px: '1px',
          0.5: '0.125rem',
          1: '0.25rem',
          1.5: '0.375rem',
          2: '0.5rem',
        },
      },
      16
    );
    expect(result).toEqual({
      spacing: {
        px: '1px',
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
      },
    });
  });
});

describe('extendTokens', () => {
  it('should extend tokens px correctly', () => {
    const result = extendTokens(
      {
        color: {
          transparent: 'transparent',
          current: 'currentColor',
          black: '#000000',
          white: '#FFFFFF',
        },
      },
      {
        color: {
          primary: '#38A169',
        },
      }
    );
    expect(result).toEqual({
      color: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',
        white: '#FFFFFF',
        primary: '#38A169',
      },
    });
  });
});
