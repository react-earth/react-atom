import React, { ElementType, forwardRef } from 'react';
import { AtomBaseProps, AtomProps, DEFAULT_COMPONENT, mergeStyle, parseAtomProps, Tokens } from '@react-atom/core';

type AtomOptions = {
  defaultComponent?: ElementType;
};

export const atom = <T extends Tokens = Tokens>(tokens: T, options?: AtomOptions) => {
  const defaultComponent = options?.defaultComponent ?? DEFAULT_COMPONENT;

  return forwardRef<any, AtomBaseProps<T>>((props, ref) => {
    const { as: Component = defaultComponent, ...rest } = props;
    const { style, htmlProps } = parseAtomProps(rest as AtomProps, tokens);

    const overrideHtmlProps: typeof htmlProps = {};

    // marge style prop into atom style
    if (htmlProps.style) {
      mergeStyle(style, htmlProps.style);
    }

    // set atom style to override html props
    overrideHtmlProps['style'] = style;

    return <Component ref={ref} {...htmlProps} {...overrideHtmlProps} />;
  });
};
