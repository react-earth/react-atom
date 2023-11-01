import React, { CSSProperties, forwardRef } from 'react';
import { AtomProps, parseAtomProps, AtomTokens, styleToCss, toCssKey } from 'react-atom-core';
import styled from '@emotion/styled';

export const atom = <T extends AtomTokens = AtomTokens>(tokens: T) => {
  return forwardRef<any, AtomProps<T>>((props, ref) => {
    const { as: Component, ...rest } = props;
    const { style, pseudoClassStyle, pseudoElementStyle, htmlProps } = parseAtomProps(rest, tokens);
    return (
      <StyledAtom
        as={Component as any}
        $style={style}
        $pseudoClassStyle={pseudoClassStyle}
        $pseudoElementStyle={pseudoElementStyle}
        ref={ref as any}
        {...htmlProps}
      />
    );
  });
};

const StyledAtom = styled.div<{
  $style: CSSProperties;
  $pseudoClassStyle: { [key: string]: CSSProperties };
  $pseudoElementStyle: { [key: string]: CSSProperties };
}>`
  ${({ $style }) => styleToCss($style)}
  ${({ $pseudoClassStyle }) => {
    return Object.entries($pseudoClassStyle)
      .map(
        ([key, style]) => `
          &:${toCssKey(key)} {
            ${styleToCss(style)}
          }
        `
      )
      .join(' ');
  }}
  ${({ $pseudoElementStyle }) => {
    return Object.entries($pseudoElementStyle)
      .map(
        ([key, style]) => `
          &::${toCssKey(key)} {
            ${styleToCss(style)}
          }
        `
      )
      .join(' ');
  }}
`;
