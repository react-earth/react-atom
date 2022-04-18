import { CSS_PROPERTIES, CSS_SPACING_PROPERTIES, CSS_COLOR_PROPERTIES } from './constants';
import { CSSProperties } from 'react';
import {
  AtomCustomStyleProps,
  AtomHtmlProps,
  AtomProps,
  AtomPseudoClassProps,
  AtomStyleProps,
  PseudoClassStyle,
  Tokens,
} from './types';

type ParseFn = (key: string, value: any, tokens: Tokens) => CSSProperties;

const isSet = (value: any) => value !== undefined && value !== false;

export const mergeStyle = (style: CSSProperties, newStyle: CSSProperties) => {
  Object.entries(newStyle).forEach(([newKey, newValue]) => {
    (style as any)[newKey] = newValue;
  });
};

const parseValue = (value: any | any[], tokens?: Tokens, tokenKey?: keyof Tokens) => {
  const innerParseValue = (value: any) => {
    if (tokens && tokenKey) {
      if (typeof value === 'string' && value in (tokens[tokenKey] || {})) {
        return tokens[tokenKey]?.[value];
      } else if (typeof value === 'number' && tokenKey === 'spacing') {
        // if is spacing, auto add px
        return value + 'px';
      }
    }
    return value;
  };
  return Array.isArray(value) ? value.map(innerParseValue).join(' ') : innerParseValue(value);
};

type ParserOptions = {
  alias?: keyof CSSProperties | (keyof CSSProperties)[];
  tokenKey?: keyof Tokens;
  style?: CSSProperties;
  transform?: (value: any) => string;
};
const parser = (options?: ParserOptions): ParseFn => {
  const { alias, tokenKey, style, transform } = options || {};

  return (key, value, tokens) => {
    if (style) {
      return style;
    }
    const parsedValue = transform ? transform(value) : parseValue(value, tokens, tokenKey);
    if (Array.isArray(alias)) {
      const result: { [key: string]: string } = {};
      alias.forEach((aliasKey) => {
        result[aliasKey] = parsedValue;
      });
      return result;
    } else {
      return { [alias || key]: parsedValue };
    }
  };
};

const CSS_CUSTOM_PROPERTIES_HANDLE: { [key in keyof AtomCustomStyleProps<Tokens>]: ParseFn } = {
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
  c: parser({ alias: 'color', tokenKey: 'color' }),
  bg: parser({ alias: 'background', tokenKey: 'color' }),
  flex: parser({ style: { display: 'flex' } }),
  flexJustify: parser({ alias: 'justifyContent' }),
  flexAlign: parser({ alias: 'alignItems' }),
  grid: parser({ style: { display: 'grid' } }),
  gridColumns: parser({ alias: 'gridTemplateColumns', transform: (value) => `repeat(${value}, 1fr)` }),
  gridRows: parser({ alias: 'gridTemplateRows', transform: (value) => `repeat(${value}, 1fr)` }),
  gridJustify: parser({ alias: 'justifyItems' }),
  gridAlign: parser({ alias: 'alignItems' }),
  gridSelfColumns: parser({ alias: 'gridColumnEnd', transform: (value) => `span ${value}` }),
  gridSelfRows: parser({ alias: 'gridRowEnd', transform: (value) => `span ${value}` }),
  gridSelfJustify: parser({ alias: 'justifySelf' }),
  gridSelfAlign: parser({ alias: 'alignSelf' }),
};

const ATOM_ALL_STYLE_PROPS = [...CSS_PROPERTIES, ...Object.keys(CSS_CUSTOM_PROPERTIES_HANDLE)];
// order by priority
export const ATOM_PSEUDO_CLASS_PROPS = ['focus', 'focusWithin', 'active', 'hover'];

const parseAtomStyleProps = (atomStyleProps: AtomStyleProps<Tokens>, tokens: Tokens) => {
  const style: CSSProperties = {};
  Object.entries(atomStyleProps).forEach(([key, value]) => {
    if (isSet(value)) {
      if (CSS_SPACING_PROPERTIES.includes(key as any)) {
        mergeStyle(style, parser({ tokenKey: 'spacing' })(key, value, tokens));
      } else if (CSS_COLOR_PROPERTIES.includes(key as any)) {
        mergeStyle(style, parser({ tokenKey: 'color' })(key, value, tokens));
      } else if (key in CSS_CUSTOM_PROPERTIES_HANDLE) {
        mergeStyle(style, (CSS_CUSTOM_PROPERTIES_HANDLE as any)[key](key, value, tokens));
      } else {
        mergeStyle(style, parser({ tokenKey: key as any })(key, value, tokens));
      }
    }
  });
  return style;
};

export const parseAtomProps = (atomProps: AtomProps, tokens: Tokens) => {
  const atomStyleProps: AtomStyleProps = {};
  const atomPseudoClassProps: AtomPseudoClassProps = {};
  const htmlProps: AtomHtmlProps = {};
  Object.entries(atomProps).forEach(([key, value]) => {
    if (ATOM_ALL_STYLE_PROPS.includes(key)) {
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
