import { CSSProperties, ElementType, HTMLProps } from 'react';

type StringTokenKeys = { [key: string]: string };
type NumberTokenKeys = { [key: string]: number };
type FontSizeTokenKeys = { [key: string]: string[] };

export type Tokens = {
  color?: StringTokenKeys;
  spacing?: StringTokenKeys;
  fontFamily?: StringTokenKeys;
  fontSize?: FontSizeTokenKeys;
  fontWeight?: NumberTokenKeys;
  border?: StringTokenKeys;
  shadow?: StringTokenKeys;
  zIndex?: NumberTokenKeys;
};

export type SpacingToken<T extends Tokens = Tokens> = keyof T['spacing'] | number | (string & {});
export type ColorToken<T extends Tokens> = keyof T['color'];
export type FontFamilyToken<T extends Tokens> = keyof T['fontFamily'];
export type FontSizeToken<T extends Tokens> = keyof T['fontSize'];
export type FontWeightToken<T extends Tokens> = keyof T['fontWeight'];
export type BorderToken<T extends Tokens> = keyof T['border'];
export type ShadowToken<T extends Tokens> = keyof T['shadow'];
export type ZIndexToken<T extends Tokens> = keyof T['zIndex'];

export type Flex<T = Tokens> = {
  direction?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  wrap?: CSSProperties['flexWrap'];
  gap?: SpacingToken<T>;
};

export type FlexItem = {
  grow?: CSSProperties['flexGrow'];
  shrink?: CSSProperties['flexShrink'];
};

export type GridFr = number | string;
export type Grid<T = Tokens> = {
  flow?: CSSProperties['gridAutoFlow'];
  rows?: GridFr;
  columns?: GridFr;
  gap?: SpacingToken<T> | [SpacingToken<T>, SpacingToken<T>];
  justify?: CSSProperties['justifyItems'];
  align?: CSSProperties['alignItems'];
};

export type GridItem = {
  span?: number;
  rows?: number;
  justify?: CSSProperties['justifySelf'];
  align?: CSSProperties['alignSelf'];
};

export type Layout<T = Tokens> = {
  flex?: Flex<T>;
  flexItem?: FlexItem;
  grid?: Grid<T>;
  gridItem?: GridItem;
};

export type AtomStyleProps<T extends Tokens = Tokens> = {
  // position
  position?: CSSProperties['position'];
  left?: SpacingToken<T>;
  right?: SpacingToken<T>;
  top?: SpacingToken<T>;
  bottom?: SpacingToken<T>;
  // layout
  flex?: Flex<T>;
  flexItem?: FlexItem;
  grid?: Grid<T>;
  gridItem?: GridItem;
  // space
  w?: SpacingToken<T>;
  minW?: SpacingToken<T>;
  maxW?: SpacingToken<T>;
  h?: SpacingToken<T>;
  minH?: SpacingToken<T>;
  maxH?: SpacingToken<T>;
  m?: SpacingToken<T>;
  mx?: SpacingToken<T>;
  my?: SpacingToken<T>;
  ml?: SpacingToken<T>;
  mr?: SpacingToken<T>;
  mt?: SpacingToken<T>;
  mb?: SpacingToken<T>;
  p?: SpacingToken<T>;
  px?: SpacingToken<T>;
  py?: SpacingToken<T>;
  pl?: SpacingToken<T>;
  pr?: SpacingToken<T>;
  pt?: SpacingToken<T>;
  pb?: SpacingToken<T>;
  display?: CSSProperties['display'];
  boxSizing?: CSSProperties['boxSizing'];
  // color
  c?: ColorToken<T>;
  bg?: ColorToken<T>;
  // text
  fontFamily?: FontFamilyToken<T>;
  fontSize?: FontSizeToken<T>;
  fontWeight?: FontWeightToken<T>;
  fontStyle?: CSSProperties['fontStyle'];
  textAlign?: CSSProperties['textAlign'];
  textDecoration?: CSSProperties['textDecoration'];
  textDecorationColor?: ColorToken<T>;
  textDecorationStyle?: CSSProperties['textDecorationStyle'];
  textOverflow?: CSSProperties['textOverflow'];
  whiteSpace?: CSSProperties['whiteSpace'];
  // border & shadow
  border?: BorderToken<T>;
  borderStyle?: CSSProperties['borderStyle'];
  borderWidth?: SpacingToken<T>;
  borderColor?: ColorToken<T>;
  borderRadius?: SpacingToken<T>;
  shadow?: ShadowToken<T>;
  // other
  overflow?: CSSProperties['overflow'];
  overflowX?: CSSProperties['overflowX'];
  overflowY?: CSSProperties['overflowY'];
  cursor?: CSSProperties['cursor'];
  zIndex?: ZIndexToken<T>;
};

export type AtomPseudoStyleProps<T extends Tokens = Tokens> = {
  hover?: AtomStyleProps<T>;
  active?: AtomStyleProps<T>;
  focus?: AtomStyleProps<T>;
  focusWithin?: AtomStyleProps<T>;
};

export type PseudoStyle = Partial<Record<keyof AtomPseudoStyleProps, CSSProperties>>;
export type ParseFn = (key: string, value: any, tokens: Tokens) => CSSProperties;

export type AtomHtmlProps = Omit<HTMLProps<HTMLElement>, 'as'>;
export type AtomProps<T extends Tokens = Tokens> = AtomStyleProps<T> &
  AtomPseudoStyleProps<T> &
  AtomHtmlProps & { as?: ElementType };
