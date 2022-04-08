import { CSSProperties } from 'react';
import {
  AtomHtmlProps,
  AtomProps,
  AtomPseudoClassProps,
  AtomStyleProps,
  Flex,
  FlexItem,
  Grid,
  GridFr,
  GridItem,
  ParseFn,
  PseudoClassStyle,
  Tokens,
} from './types';

export const isSet = (value: any) => value !== undefined;

export const parseValue = (value: any | any[], tokens?: Tokens, tokenKey?: keyof Tokens) => {
  const numberToPxTokenKeys: (keyof Tokens)[] = ['spacing', 'fontSize'];
  const innerParseValue = (value: any) => {
    if (tokens && tokenKey) {
      if (typeof value === 'string' && value in (tokens[tokenKey] || {})) {
        return tokens[tokenKey]?.[value];
      } else if (typeof value === 'number' && numberToPxTokenKeys.includes(tokenKey)) {
        return value + 'px';
      }
    }
    return value;
  };
  return Array.isArray(value) ? value.map(innerParseValue).join(' ') : innerParseValue(value);
};

export const parseGridFrValue = (token: GridFr) => (typeof token === 'number' ? `repeat(${token}, 1fr)` : token);

type ParserOptions = {
  alias?: keyof CSSProperties | (keyof CSSProperties)[];
  tokenKey?: keyof Tokens;
};
export const parser = (options?: ParserOptions): ParseFn => {
  const { alias, tokenKey } = options || {};

  return (key, value, tokens) => {
    if (Array.isArray(alias)) {
      const result: { [key: string]: string } = {};
      const resultValue = parseValue(value, tokens, tokenKey);
      alias.forEach((aliasKey) => {
        result[aliasKey] = resultValue;
      });
      return result;
    } else {
      return { [alias || key]: parseValue(value, tokens, tokenKey) };
    }
  };
};

export const flexParser = (): ParseFn => {
  return (_key, value: Flex, tokens) => {
    const css: CSSProperties = {};
    css.display = 'flex';
    isSet(value.direction) && (css.flexDirection = value.direction);
    isSet(value.justify) && (css.justifyContent = value.justify);
    isSet(value.align) && (css.alignItems = value.align);
    isSet(value.gap) && (css.gap = parseValue(value.gap, tokens, 'spacing'));
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
    isSet(value.rows) && (css.gridTemplateRows = parseGridFrValue(value.rows!));
    isSet(value.columns) && (css.gridTemplateColumns = parseGridFrValue(value.columns!));
    isSet(value.justify) && (css.justifyItems = value.justify);
    isSet(value.align) && (css.alignItems = value.align);
    isSet(value.gap) && (css.gap = parseValue(value.gap, tokens, 'spacing'));
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

export const mergeStyle = (style: CSSProperties, newStyle: CSSProperties) => {
  Object.entries(newStyle).forEach(([newKey, newValue]) => {
    (style as any)[newKey] = newValue;
  });
};

export const ATOM_STYLE_PROPS: Record<keyof AtomStyleProps, ParseFn> = {
  position: parser(),
  left: parser(),
  right: parser(),
  top: parser(),
  bottom: parser(),
  flex: flexParser(),
  flexItem: flexItemParser(),
  grid: gridParser(),
  gridItem: gridItemParser(),
  w: parser({ alias: 'width', tokenKey: 'spacing' }),
  minW: parser({ alias: 'minWidth', tokenKey: 'spacing' }),
  maxW: parser({ alias: 'maxWidth', tokenKey: 'spacing' }),
  h: parser({ alias: 'height', tokenKey: 'spacing' }),
  minH: parser({ alias: 'minHeight', tokenKey: 'spacing' }),
  maxH: parser({ alias: 'maxHeight', tokenKey: 'spacing' }),
  m: parser({ alias: 'margin', tokenKey: 'spacing' }),
  mx: parser({ alias: ['marginLeft', 'marginRight'], tokenKey: 'spacing' }),
  my: parser({ alias: ['marginTop', 'marginBottom'], tokenKey: 'spacing' }),
  ml: parser({ alias: 'marginLeft', tokenKey: 'spacing' }),
  mr: parser({ alias: 'marginRight', tokenKey: 'spacing' }),
  mt: parser({ alias: 'marginTop', tokenKey: 'spacing' }),
  mb: parser({ alias: 'marginBottom', tokenKey: 'spacing' }),
  p: parser({ alias: 'padding', tokenKey: 'spacing' }),
  px: parser({ alias: ['paddingLeft', 'paddingRight'], tokenKey: 'spacing' }),
  py: parser({ alias: ['paddingTop', 'paddingBottom'], tokenKey: 'spacing' }),
  pl: parser({ alias: 'paddingLeft', tokenKey: 'spacing' }),
  pr: parser({ alias: 'paddingRight', tokenKey: 'spacing' }),
  pt: parser({ alias: 'paddingTop', tokenKey: 'spacing' }),
  pb: parser({ alias: 'paddingBottom', tokenKey: 'spacing' }),
  display: parser(),
  boxSizing: parser(),
  c: parser({ alias: 'color', tokenKey: 'color' }),
  bg: parser({ alias: 'background', tokenKey: 'color' }),
  fontFamily: parser({ tokenKey: 'fontFamily' }),
  fontSize: parser({ tokenKey: 'fontSize' }),
  lineHeight: parser({ tokenKey: 'lineHeight' }),
  fontWeight: parser({ tokenKey: 'fontWeight' }),
  fontStyle: parser(),
  textAlign: parser(),
  textTransform: parser(),
  textDecoration: parser(),
  textDecorationColor: parser(),
  textDecorationStyle: parser(),
  textOverflow: parser(),
  whiteSpace: parser(),
  border: parser({ tokenKey: 'border' }),
  borderStyle: parser(),
  borderWidth: parser({ tokenKey: 'spacing' }),
  borderColor: parser({ tokenKey: 'color' }),
  borderRadius: parser(),
  overflow: parser(),
  overflowX: parser(),
  overflowY: parser(),
  cursor: parser(),
  zIndex: parser({ tokenKey: 'zIndex' }),
  opacity: parser(),
};

// order by priority
export const ATOM_PSEUDO_CLASS_PROPS = ['focus', 'focusWithin', 'active', 'hover'];

export const parseAtomStyleProps = (atomStyleProps: AtomStyleProps, tokens: Tokens) => {
  const style: CSSProperties = {};
  Object.entries(atomStyleProps).forEach(([key, value]) => {
    if (isSet(value)) {
      mergeStyle(style, (ATOM_STYLE_PROPS as any)[key](key, value, tokens));
    }
  });
  return style;
};

export const parseAtomProps = (atomProps: AtomProps, tokens: Tokens) => {
  const atomStyleProps: AtomStyleProps = {};
  const atomPseudoClassProps: AtomPseudoClassProps = {};
  const htmlProps: AtomHtmlProps = {};
  // split props
  Object.entries(atomProps).forEach(([key, value]) => {
    if (key in ATOM_STYLE_PROPS) {
      (atomStyleProps as any)[key] = value;
    } else if (ATOM_PSEUDO_CLASS_PROPS.includes(key)) {
      (atomPseudoClassProps as any)[key] = value;
    } else {
      (htmlProps as any)[key] = value;
    }
  });
  const style = parseAtomStyleProps(atomStyleProps, tokens);
  const pseudoClassStyle: PseudoClassStyle = {};
  Object.entries(atomPseudoClassProps).forEach(([key, value]) => {
    (pseudoClassStyle as any)[key] = parseAtomStyleProps(value, tokens);
  });
  return { style, pseudoClassStyle, htmlProps };
};
