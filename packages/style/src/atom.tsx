import React, { ElementType, forwardRef, useState } from 'react';
import {
  AtomProps,
  DEFAULT_COMPONENT,
  DEFAULT_PLATFORM,
  mergeStyle,
  parseAtomProps,
  PLATFORM,
  Tokens,
} from '@react-atom/core';

type AtomOptions = {
  defaultComponent?: ElementType;
  platform?: PLATFORM;
};

export const atom = <T extends Tokens = Tokens>(tokens: T, options?: AtomOptions) => {
  const defaultComponent = options?.defaultComponent ?? DEFAULT_COMPONENT;
  const platform = options?.platform ?? DEFAULT_PLATFORM;

  return forwardRef<any, AtomProps<T>>((props, ref) => {
    const { as: Component = defaultComponent, ...rest } = props;
    const { style, pseudoClassStyle, htmlProps } = parseAtomProps(rest as AtomProps, tokens);

    const [isHover, setIsHover] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isFocusWithIn, setIsFocusWithIn] = useState<boolean>(false);

    const overrideHtmlProps: typeof htmlProps = {};

    // marge style prop into atom style
    if (htmlProps.style) {
      mergeStyle(style, htmlProps.style);
    }

    // support pseudo class when platform is web
    if (platform === 'web') {
      // override event listener to implement pseudo class
      overrideHtmlProps['onMouseEnter'] = (event) => {
        pseudoClassStyle.hover && setIsHover(true);
        htmlProps.onMouseEnter?.(event);
      };
      overrideHtmlProps['onMouseLeave'] = (event) => {
        pseudoClassStyle.hover && setIsHover(false);
        htmlProps.onMouseLeave?.(event);
      };
      overrideHtmlProps['onMouseDown'] = (event) => {
        if (pseudoClassStyle.active) {
          setIsActive(true);
          // use document mouse up, avoid can't trigger onMouseUp when move out of current element
          document.addEventListener(
            'mouseup',
            () => {
              setIsActive(false);
            },
            { once: true }
          );
        }
        htmlProps.onMouseDown?.(event);
      };
      overrideHtmlProps['onFocus'] = (event) => {
        if (event.currentTarget === event.target) {
          pseudoClassStyle.focus && setIsFocus(true);
        } else {
          pseudoClassStyle.focusWithin && setIsFocusWithIn(true);
        }
        htmlProps.onFocus?.(event);
      };
      overrideHtmlProps['onBlur'] = (event) => {
        if (event.currentTarget === event.target) {
          pseudoClassStyle.focus && setIsFocus(false);
        } else {
          pseudoClassStyle.focusWithin && setIsFocusWithIn(false);
        }
        htmlProps.onBlur?.(event);
      };
    }

    // merge pseudo styles into atom style by priority
    if (isHover && pseudoClassStyle.hover) {
      mergeStyle(style, pseudoClassStyle.hover);
    }
    if (isActive && pseudoClassStyle.active) {
      mergeStyle(style, pseudoClassStyle.active);
    }
    if (isFocusWithIn && pseudoClassStyle.focusWithin) {
      mergeStyle(style, pseudoClassStyle.focusWithin);
    }
    if (isFocus && pseudoClassStyle.focus) {
      mergeStyle(style, pseudoClassStyle.focus);
    }

    // set atom style to override html props
    overrideHtmlProps['style'] = style;

    return <Component ref={ref} {...htmlProps} {...overrideHtmlProps} />;
  });
};
