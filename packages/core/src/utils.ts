import { CSSProperties } from 'react';
import { ATOM_PSEUDO_STYLE_PROPS, ATOM_STYLE_PROPS } from './constants';
import {
  AtomHtmlProps,
  AtomProps,
  AtomPseudoStyleProps,
  AtomStyleProps,
  Flex,
  FlexItem,
  Grid,
  GridFr,
  GridItem,
  ParseFn,
  PseudoStyle,
  SpacingToken,
  Tokens,
} from './types';

export const isSet = (value: any) => value !== undefined;

export const tokenParser = (tokenKey: keyof Tokens, alias?: keyof CSSProperties): ParseFn => {
  return (key, value, tokens) => {
    return {
      [alias || key]: tokens[tokenKey][value],
    };
  };
};

export const spacingParse = (token: SpacingToken | SpacingToken[], tokens: Tokens) => {
  const spacingItemParse = (tokenItem: SpacingToken) => {
    if (typeof tokenItem === 'string') {
      if (tokenItem in tokens.spacing) {
        return tokens.spacing[tokenItem];
      } else {
        return tokenItem;
      }
    } else {
      return tokenItem + 'px';
    }
  };
  if (Array.isArray(token)) {
    return token.map(spacingItemParse).join(' ');
  } else {
    return spacingItemParse(token);
  }
};

export const gridFrParse = (token: GridFr) => (typeof token === 'number' ? `repeat(${token}, 1fr)` : token);

export const defaultParser = (): ParseFn => {
  return (key, value) => ({ [key]: value });
};

export const flexParser = (): ParseFn => {
  return (_key, value: Flex, tokens) => {
    const css: CSSProperties = {};
    css.display = 'flex';
    isSet(value.direction) && (css.flexDirection = value.direction);
    isSet(value.justify) && (css.justifyContent = value.justify);
    isSet(value.align) && (css.alignItems = value.align);
    isSet(value.gap) && (css.gap = spacingParse(value.gap, tokens));
    isSet(value.wrap) && (css.flexWrap = value.wrap);
    return css;
  };
};

export const flexItemParser = (): ParseFn => {
  return (_key, value: FlexItem) => {
    const css: CSSProperties = {};
    isSet(value.grow) && (css.flexGrow = value.grow);
    isSet(value.shrink) && (css.flexShrink = value.shrink);
    return css;
  };
};

export const gridParser = (): ParseFn => {
  return (_key, value: Grid, tokens) => {
    const css: CSSProperties = {};
    css.display = 'grid';
    isSet(value.flow) && (css.gridAutoColumns = value.flow);
    isSet(value.rows) && (css.gridRow = gridFrParse(value.rows));
    isSet(value.columns) && (css.gridColumn = gridFrParse(value.columns));
    isSet(value.justify) && (css.justifyItems = value.justify);
    isSet(value.align) && (css.alignItems = value.align);
    isSet(value.gap) && (css.gap = spacingParse(value.gap, tokens));
    return css;
  };
};

export const gridItemParser = (): ParseFn => {
  return (_key, value: GridItem) => {
    const css: CSSProperties = {};
    isSet(value.span) && (css.gridColumnEnd = `span ${value.span}`);
    isSet(value.rows) && (css.gridRowEnd = `span ${value.rows}`);
    isSet(value.justify) && (css.justifySelf = value.justify);
    isSet(value.align) && (css.alignSelf = value.align);
    return css;
  };
};

export const spacingParser = (alias?: keyof CSSProperties | (keyof CSSProperties)[]): ParseFn => {
  return (key, value, tokens) => {
    const css = {};
    if (Array.isArray(alias)) {
      alias.forEach((aliasItem) => {
        css[aliasItem] = spacingParse(value, tokens);
      });
    } else {
      css[alias || key] = spacingParse(value, tokens);
    }
    return css;
  };
};

export const fontSizeParser = (): ParseFn => {
  return (_key, value, tokens) => {
    const [fontSize, lineHeight] = tokens.fontSize[value];
    return {
      fontSize,
      lineHeight,
    };
  };
};

export const mergeStyle = (style: CSSProperties, newStyle: CSSProperties) => {
  Object.entries(newStyle).forEach(([newKey, newValue]) => {
    style[newKey] = newValue;
  });
};

export const parseAtomStyleProps = (atomStyleProps: AtomStyleProps, tokens: Tokens) => {
  const style: CSSProperties = {};
  Object.entries(atomStyleProps).forEach(([key, value]) => {
    if (isSet(value)) {
      mergeStyle(style, ATOM_STYLE_PROPS[key](key, value, tokens));
    }
  });
  return style;
};

export const parseAtomProps = (atomProps: AtomProps, tokens: Tokens) => {
  const atomStyleProps: AtomStyleProps = {};
  const atomPseudoStyleProps: AtomPseudoStyleProps = {};
  const htmlProps: AtomHtmlProps = {};
  // split props
  Object.entries(atomProps).forEach(([key, value]) => {
    if (key in ATOM_STYLE_PROPS) {
      atomStyleProps[key] = value;
    } else if (ATOM_PSEUDO_STYLE_PROPS.includes(key)) {
      atomPseudoStyleProps[key] = value;
    } else {
      htmlProps[key] = value;
    }
  });
  const style = parseAtomStyleProps(atomStyleProps, tokens);
  const pseudoStyle: PseudoStyle = {};
  Object.entries(atomPseudoStyleProps).forEach(([key, value]) => {
    pseudoStyle[key] = parseAtomStyleProps(value, tokens);
  });
  return { style, pseudoStyle, htmlProps };
};
