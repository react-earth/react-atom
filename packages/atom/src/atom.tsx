import React from 'react';
import { AtomProps, DEFAULT_COMPONENT, parseAtomProps, Tokens } from '@react-atom/core';

export const atom = <T extends Tokens = Tokens>(tokens: T) => {
  return (props: AtomProps<T>) => {
    const { as: Component = DEFAULT_COMPONENT, ...rest } = props;
    const { style, other } = parseAtomProps(rest as AtomProps, tokens);
    return <Component style={style} {...other} />;
  };
};
