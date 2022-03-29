import React, { useState } from 'react';
import { AtomProps, DEFAULT_COMPONENT, mergeStyle, parseAtomProps, Tokens } from '@react-atom/core';

export const atom = <T extends Tokens = Tokens>(tokens: T) => {
  return (props: AtomProps<T>) => {
    const { as: Component = DEFAULT_COMPONENT, ...rest } = props;
    const { style, pseudoStyle, htmlProps } = parseAtomProps(rest as AtomProps, tokens);

    const [isHover, setIsHover] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isFocusWithIn, setIsFocusWithIn] = useState<boolean>(false);

    const { style: htmlStyle, onMouseEnter, onMouseLeave, onMouseDown, onFocus, onBlur, ...restHtmlProps } = htmlProps;

    const onMouseEnterWrapper: typeof onMouseEnter = (event) => {
      pseudoStyle.hover && setIsHover(true);
      onMouseEnter?.(event);
    };
    const onMouseLeaveWrapper: typeof onMouseLeave = (event) => {
      pseudoStyle.hover && setIsHover(false);
      onMouseLeave?.(event);
    };
    const onMouseDownWrapper: typeof onMouseDown = (event) => {
      if (pseudoStyle.active) {
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
        pseudoStyle.focus && setIsFocus(true);
      } else {
        pseudoStyle.focusWithin && setIsFocusWithIn(true);
      }
      onFocus?.(event);
    };
    const onBlurWrapper: typeof onBlur = (event) => {
      if (event.currentTarget === event.target) {
        pseudoStyle.focus && setIsFocus(false);
      } else {
        pseudoStyle.focusWithin && setIsFocusWithIn(false);
      }
      onBlur?.(event);
    };

    if (htmlStyle) {
      mergeStyle(style, htmlStyle);
    }
    // pseudo style priority, focus > focusWithin > active > hover
    if (isHover && pseudoStyle.hover) {
      mergeStyle(style, pseudoStyle.hover);
    }
    if (isActive && pseudoStyle.active) {
      mergeStyle(style, pseudoStyle.active);
    }
    if (isFocusWithIn && pseudoStyle.focusWithin) {
      mergeStyle(style, pseudoStyle.focusWithin);
    }
    if (isFocus && pseudoStyle.focus) {
      mergeStyle(style, pseudoStyle.focus);
    }

    return (
      <Component
        style={style}
        onMouseEnter={onMouseEnterWrapper}
        onMouseLeave={onMouseLeaveWrapper}
        onMouseDown={onMouseDownWrapper}
        onFocus={onFocusWrapper}
        onBlur={onBlurWrapper}
        {...restHtmlProps}
      />
    );
  };
};
