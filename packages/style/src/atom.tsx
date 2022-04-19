import React, { forwardRef, useState } from 'react';
import { AtomProps, DEFAULT_COMPONENT, mergeStyle, parseAtomProps, Tokens } from '@react-atom/core';

export const atom = <T extends Tokens = Tokens>(tokens: T) => {
  return forwardRef<any, AtomProps<T>>((props, ref) => {
    const { as: Component = DEFAULT_COMPONENT, ...rest } = props;
    const { style, pseudoClassStyle, htmlProps } = parseAtomProps(rest as AtomProps, tokens);

    const [isHover, setIsHover] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isFocusWithIn, setIsFocusWithIn] = useState<boolean>(false);

    const { style: htmlStyle, onMouseEnter, onMouseLeave, onMouseDown, onFocus, onBlur, ...restHtmlProps } = htmlProps;

    const onMouseEnterWrapper: typeof onMouseEnter = (event) => {
      pseudoClassStyle.hover && setIsHover(true);
      onMouseEnter?.(event);
    };
    const onMouseLeaveWrapper: typeof onMouseLeave = (event) => {
      pseudoClassStyle.hover && setIsHover(false);
      onMouseLeave?.(event);
    };
    const onMouseDownWrapper: typeof onMouseDown = (event) => {
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
      onMouseEnter?.(event);
    };
    const onFocusWrapper: typeof onFocus = (event) => {
      if (event.currentTarget === event.target) {
        pseudoClassStyle.focus && setIsFocus(true);
      } else {
        pseudoClassStyle.focusWithin && setIsFocusWithIn(true);
      }
      onFocus?.(event);
    };
    const onBlurWrapper: typeof onBlur = (event) => {
      if (event.currentTarget === event.target) {
        pseudoClassStyle.focus && setIsFocus(false);
      } else {
        pseudoClassStyle.focusWithin && setIsFocusWithIn(false);
      }
      onBlur?.(event);
    };

    if (htmlStyle) {
      mergeStyle(style, htmlStyle);
    }
    // pseudo style priority, focus > focusWithin > active > hover
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

    return (
      <Component
        style={style}
        onMouseEnter={onMouseEnterWrapper}
        onMouseLeave={onMouseLeaveWrapper}
        onMouseDown={onMouseDownWrapper}
        onFocus={onFocusWrapper}
        onBlur={onBlurWrapper}
        ref={ref}
        {...restHtmlProps}
      />
    );
  });
};
