import React, { CSSProperties } from 'react';
import { AtomProps, DEFAULT_COMPONENT, parseAtomProps, PseudoStyle, Tokens } from '@react-atom/core';
import styled from 'styled-components';

const PSEUDO_STYLE_PRIORITY = ['focusWithin', 'focus', 'hover', 'active'];

const normalizeKey = (key: string) => key.replace(/([A-Z])/g, '-$1').toLowerCase();

const parseStyle = (style: CSSProperties) =>
  Object.entries(style)
    .map(([key, value]) => `${normalizeKey(key)}: ${value};`)
    .join('');

export const atom = <T extends Tokens = Tokens>(tokens: T) => {
  return (props: AtomProps<T>) => {
    const { as: Component = DEFAULT_COMPONENT, ...rest } = props;
    const { style, pseudoStyle, htmlProps } = parseAtomProps(rest as AtomProps, tokens);
    return <StyledAtom as={Component} $style={style} $pseudoStyle={pseudoStyle} {...htmlProps} />;
  };
};

const StyledAtom = styled.section<{ $style: CSSProperties; $pseudoStyle: PseudoStyle }>`
  ${({ $style }) => parseStyle($style)}
  ${({ $pseudoStyle }) => {
    return Object.entries($pseudoStyle)
      .sort(([key1], [key2]) => PSEUDO_STYLE_PRIORITY[key1] - PSEUDO_STYLE_PRIORITY[key2])
      .map(
        ([key, style]) => `
          &:${normalizeKey(key)} {
            ${parseStyle(style)}
          }
        `
      )
      .join(' ');
  }}
`;
