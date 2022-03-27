import { CSSProperties } from 'react';
import { AtomProps, AtomStyleProps, Tokens, SpacingToken, GridFr, Flex, FlexItem, Grid, GridItem } from './types';

export type ParseFn = (key: string, value: any, tokens: Tokens) => CSSProperties;

const isSet = (value: any) => value !== undefined;

const spacingParse = (token: SpacingToken | SpacingToken[], tokens: Tokens) => {
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
const gridFrParse = (token: GridFr) => (typeof token === 'number' ? `repeat(${token}, 1fr)` : token);

export const defaultParser = (): ParseFn => {
  return (key, value) => ({ [key]: value });
};

const flexParser = (): ParseFn => {
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

const flexItemParser = (): ParseFn => {
  return (_key, value: FlexItem) => {
    const css: CSSProperties = {};
    isSet(value.grow) && (css.flexGrow = value.grow);
    isSet(value.shrink) && (css.flexShrink = value.shrink);
    return css;
  };
};

const gridParser = (): ParseFn => {
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

const gridItemParser = (): ParseFn => {
  return (_key, value: GridItem) => {
    const css: CSSProperties = {};
    isSet(value.span) && (css.gridColumnEnd = `span ${value.span}`);
    isSet(value.rows) && (css.gridRowEnd = `span ${value.rows}`);
    isSet(value.justify) && (css.justifySelf = value.justify);
    isSet(value.align) && (css.alignSelf = value.align);
    return css;
  };
};

const spacingParser = (alias?: keyof CSSProperties | (keyof CSSProperties)[]): ParseFn => {
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

const tokenParser = (tokenKey: keyof Tokens, alias?: keyof CSSProperties): ParseFn => {
  return (key, value, tokens) => {
    return {
      [alias || key]: tokens[tokenKey][value],
    };
  };
};

const fontSizeParser = (): ParseFn => {
  return (_key, value, tokens) => {
    const [fontSize, lineHeight] = tokens.fontSize[value];
    return {
      fontSize,
      lineHeight,
    };
  };
};

export const ATOM_STYLE_PARSE_FN_MAPPING: Record<keyof AtomStyleProps, ParseFn> = {
  position: defaultParser(),
  left: spacingParser(),
  right: spacingParser(),
  top: spacingParser(),
  bottom: spacingParser(),
  flex: flexParser(),
  flexItem: flexItemParser(),
  grid: gridParser(),
  gridItem: gridItemParser(),
  w: spacingParser('width'),
  minW: spacingParser('minWidth'),
  maxW: spacingParser('maxWidth'),
  h: spacingParser('height'),
  minH: spacingParser('minHeight'),
  maxH: spacingParser('maxHeight'),
  m: spacingParser('margin'),
  mx: spacingParser(['marginLeft', 'marginRight']),
  my: spacingParser(['marginTop', 'marginBottom']),
  ml: spacingParser('marginLeft'),
  mr: spacingParser('marginRight'),
  mt: spacingParser('marginTop'),
  mb: spacingParser('marginBottom'),
  p: spacingParser('padding'),
  px: spacingParser(['paddingLeft', 'paddingRight']),
  py: spacingParser(['paddingTop', 'paddingBottom']),
  pl: spacingParser('paddingLeft'),
  pr: spacingParser('paddingRight'),
  pt: spacingParser('paddingTop'),
  pb: spacingParser('paddingBottom'),
  display: defaultParser(),
  boxSizing: defaultParser(),
  c: tokenParser('color', 'color'),
  bg: tokenParser('color', 'background'),
  fontFamily: tokenParser('fontFamily'),
  fontSize: fontSizeParser(),
  fontWeight: tokenParser('fontWeight'),
  fontStyle: defaultParser(),
  textAlign: defaultParser(),
  textDecoration: defaultParser(),
  textDecorationColor: defaultParser(),
  textDecorationStyle: defaultParser(),
  textOverflow: defaultParser(),
  whiteSpace: defaultParser(),
  border: tokenParser('border'),
  borderStyle: defaultParser(),
  borderWidth: spacingParser(),
  borderColor: tokenParser('color'),
  borderRadius: spacingParser(),
  shadow: tokenParser('shadow', 'boxShadow'),
  overflow: defaultParser(),
  overflowX: defaultParser(),
  overflowY: defaultParser(),
  cursor: defaultParser(),
  zIndex: tokenParser('zIndex'),
};

export const parseAtomProps = (atomProps: AtomProps, tokens: Tokens) => {
  const style: CSSProperties = {};
  const other = {};
  const atomStyleKeys = Object.keys(ATOM_STYLE_PARSE_FN_MAPPING);
  Object.entries(atomProps).forEach(([key, value]) => {
    if (atomStyleKeys.includes(key) && isSet(value)) {
      const newStyle = (ATOM_STYLE_PARSE_FN_MAPPING[key] as ParseFn)(key, value, tokens);
      Object.entries(newStyle).forEach(([styleKey, styleValue]) => {
        style[styleKey] = styleValue;
      });
    } else {
      other[key] = value;
    }
  });
  return { style, other };
};