import React, { CSSProperties } from 'react';
import { AtomProps, DEFAULT_COMPONENT, parseAtomProps, Tokens } from '@react-atom/core';
import styled from '@emotion/styled';

const normalizeKey = (key: string) => key.replace(/([A-Z])/g, '-$1').toLowerCase();

const parseStyle = (style: CSSProperties) =>
  Object.entries(style)
    .map(([key, value]) => `${normalizeKey(key)}: ${value};`)
    .join('');

export const atom = <T extends Tokens = Tokens>(tokens: T) => {
  return (props: AtomProps<T>) => {
    const { as: Component = DEFAULT_COMPONENT, ...rest } = props;
    const { style, other } = parseAtomProps(rest as AtomProps, tokens);
    return <StyledAtom $style={style} as={Component} {...other} />;
  };
};

const StyledAtom = styled.section<{ $style: CSSProperties }>`
  ${({ $style }) => parseStyle($style)}
`;
