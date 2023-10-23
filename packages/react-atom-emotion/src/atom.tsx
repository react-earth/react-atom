import React, { CSSProperties, ElementType, forwardRef } from 'react';
import {
  AtomProps,
  ATOM_PSEUDO_CLASS_PROPS,
  DEFAULT_COMPONENT,
  parseAtomProps,
  PseudoClassStyle,
  Tokens,
} from 'react-atom-core';
import styled from '@emotion/styled';

const normalizeKey = (key: string) => key.replace(/([A-Z])/g, '-$1').toLowerCase();

const parseStyle = (style: CSSProperties) =>
  Object.entries(style)
    .map(([key, value]) => `${normalizeKey(key)}: ${value};`)
    .join('');

type AtomOptions = {
  defaultComponent?: ElementType;
};

export const atom = <T extends Tokens = Tokens>(tokens: T, options?: AtomOptions) => {
  const defaultComponent = options?.defaultComponent ?? DEFAULT_COMPONENT;

  return forwardRef<any, AtomProps<T>>((props, ref) => {
    const { as: Component = defaultComponent, ...rest } = props;
    const { style, pseudoClassStyle, htmlProps } = parseAtomProps(rest as AtomProps, tokens);
    return (
      <StyledAtom as={Component} $style={style} $pseudoClassStyle={pseudoClassStyle} ref={ref as any} {...htmlProps} />
    );
  });
};

const StyledAtom = styled.div<{ $style: CSSProperties; $pseudoClassStyle: PseudoClassStyle }>`
  ${({ $style }) => parseStyle($style)}
  ${({ $pseudoClassStyle }) => {
    return Object.entries($pseudoClassStyle)
      .sort(
        ([key1], [key2]) =>
          ATOM_PSEUDO_CLASS_PROPS.findIndex((key) => key === key2) -
          ATOM_PSEUDO_CLASS_PROPS.findIndex((key) => key === key1)
      )
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
