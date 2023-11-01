import { CSSProperties, HTMLProps } from 'react';
import { pathGet } from 'object-standard-path';
import {
  ATOM_CSS_PROPERTIES,
  ATOM_CSS_SPACING_PROPERTIES,
  ATOM_CSS_COLOR_PROPERTIES,
  ATOM_PSEUDO_CLASSES,
  ATOM_PSEUDO_ELEMENTS,
} from './constants';
import { AtomCustomStyleProps, AtomProps, AtomPseudoClassProps, AtomStyleProps, AtomTokens } from './types';

// check if value is set
const isSet = (value: any) => value !== undefined;

// merge style
export const mergeStyle = (style: CSSProperties, newStyle: CSSProperties) => {
  Object.entries(newStyle).forEach(([newKey, newValue]) => {
    (style as any)[newKey] = newValue;
  });
};

// parse token value
const parseValue = (value: any | any[], tokens: AtomTokens, tokenKey?: keyof AtomTokens) => {
  const innerParseValue = (value: any) => {
    if (tokenKey) {
      if (typeof value === 'number' && tokenKey === 'spacing') {
        // add px if is spacing and value is number
        return value + 'px';
      } else if (tokenKey in tokens) {
        return pathGet(tokens[tokenKey], value);
      }
    }
    return value;
  };
  return Array.isArray(value) ? value.map(innerParseValue).join(' ') : innerParseValue(value);
};

// generate parse fn
type ParseFn = (key: string, value: any, tokens: AtomTokens) => CSSProperties;
type ParserOptions = {
  alias?: keyof CSSProperties | (keyof CSSProperties)[];
  tokenKey?: keyof AtomTokens;
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
      const result: CSSProperties = {};
      alias.forEach((aliasKey) => {
        (result as any)[aliasKey] = parsedValue;
      });
      return result;
    }
    return { [alias || key]: parsedValue };
  };
};

// atom css custom properties handle
const ATOM_CSS_CUSTOM_PROPERTIES_HANDLE: { [key in keyof AtomCustomStyleProps]: ParseFn } = {
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

// all atom style props
const ATOM_ALL_STYLE_PROPS = [...ATOM_CSS_PROPERTIES, ...Object.keys(ATOM_CSS_CUSTOM_PROPERTIES_HANDLE)];

// parse atom style props
const parseAtomStyleProps = <T extends AtomTokens>(atomStyleProps: AtomStyleProps<T>, tokens: T) => {
  const style: CSSProperties = {};
  Object.entries(atomStyleProps).forEach(([key, value]) => {
    if (isSet(value)) {
      if (ATOM_CSS_COLOR_PROPERTIES.includes(key as any)) {
        mergeStyle(style, parser({ tokenKey: 'color' })(key, value, tokens));
      } else if (ATOM_CSS_SPACING_PROPERTIES.includes(key as any)) {
        mergeStyle(style, parser({ tokenKey: 'spacing' })(key, value, tokens));
      } else if (key in ATOM_CSS_CUSTOM_PROPERTIES_HANDLE) {
        mergeStyle(style, (ATOM_CSS_CUSTOM_PROPERTIES_HANDLE as any)[key](key, value, tokens));
      } else {
        mergeStyle(style, parser({ tokenKey: key as any })(key, value, tokens));
      }
    }
  });
  return style;
};

// parse atom props
export const parseAtomProps = <T extends AtomTokens>(atomProps: AtomProps<T>, tokens: T) => {
  const atomStyleProps: AtomStyleProps<T> = {};
  const atomPseudoClassProps: AtomPseudoClassProps<T> = {};
  const atomPseudoElementProps: AtomPseudoClassProps<T> = {};
  const htmlProps: HTMLProps<HTMLElement> = {};

  // handle atom props
  Object.entries(atomProps).forEach(([key, value]) => {
    if (ATOM_ALL_STYLE_PROPS.includes(key)) {
      (atomStyleProps as any)[key] = value;
    } else if (ATOM_PSEUDO_CLASSES.includes(key as any)) {
      (atomPseudoClassProps as any)[key] = value;
    } else if (ATOM_PSEUDO_ELEMENTS.includes(key as any)) {
      (atomPseudoElementProps as any)[key] = value;
    } else {
      (htmlProps as any)[key] = value;
    }
  });

  // handle atom style props
  const style = parseAtomStyleProps(atomStyleProps, tokens);

  // handle atom pseudo class props
  const pseudoClassStyle: { [key: string]: CSSProperties } = {};
  Object.entries(atomPseudoClassProps).forEach(([key, value]) => {
    pseudoClassStyle[key.replace('$', '')] = parseAtomStyleProps(value, tokens);
  });

  // handle atom pseudo element props
  const pseudoElementStyle: { [key: string]: CSSProperties } = {};
  Object.entries(atomPseudoElementProps).forEach(([key, value]) => {
    pseudoElementStyle[key.replace('$$', '')] = parseAtomStyleProps(value, tokens);
  });

  return { style, pseudoClassStyle, pseudoElementStyle, htmlProps };
};

// normalize key, e.g. fontSize -> font-size
export const toCssKey = (key: string) => key.replace(/([A-Z])/g, '-$1').toLowerCase();

// cover style to css
export const styleToCss = (style: CSSProperties) =>
  Object.entries(style)
    .map(([key, value]) => `${toCssKey(key)}:${value};`)
    .join('');
