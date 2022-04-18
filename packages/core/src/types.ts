import { CSSProperties, ElementType, HTMLProps } from 'react';
import { CSS_COLOR_PROPERTIES, CSS_PROPERTIES, CSS_SPACING_PROPERTIES } from './constants';

type ArrayValuesType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer V> ? V : never;

type CSSPropertiesKeys = ArrayValuesType<typeof CSS_PROPERTIES>;
type CSSSpacingPropertiesKeys = ArrayValuesType<typeof CSS_SPACING_PROPERTIES>;
type CSSColorPropertiesKeys = ArrayValuesType<typeof CSS_COLOR_PROPERTIES>;

type TokenKeys = { [key: string]: string | number };

export type Tokens = {
  color?: TokenKeys;
  spacing?: TokenKeys;
} & { [key in CSSPropertiesKeys]?: TokenKeys };

type AllowFalse<T> = T | false;
type TokenKeyExtends<T> = AllowFalse<T | number | (string & {})>;

type SpacingToken<T extends Tokens = Tokens> = TokenKeyExtends<keyof T['spacing']>;
type ColorToken<T extends Tokens = Tokens> = TokenKeyExtends<keyof T['color']>;

type AtomSpacingStyleProps<T extends Tokens = Tokens> = {
  [key in CSSSpacingPropertiesKeys]?: SpacingToken<T>;
};
type AtomColorStyleProps<T extends Tokens = Tokens> = {
  [key in CSSColorPropertiesKeys]?: ColorToken<T>;
};
export type AtomCustomStyleProps<T extends Tokens = Tokens> = {
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
  c?: ColorToken<T>;
  bg?: ColorToken<T>;
  flex?: boolean;
  flexJustify?: AllowFalse<CSSProperties['justifyContent']>;
  flexAlign?: AllowFalse<CSSProperties['alignItems']>;
  grid?: boolean;
  gridColumns?: AllowFalse<number>;
  gridRows?: AllowFalse<number>;
  gridJustify?: AllowFalse<CSSProperties['justifyItems']>;
  gridAlign?: AllowFalse<CSSProperties['alignItems']>;
  gridSelfColumns?: AllowFalse<number>;
  gridSelfRows?: AllowFalse<number>;
  gridSelfJustify?: AllowFalse<CSSProperties['justifySelf']>;
  gridSelfAlign?: AllowFalse<CSSProperties['alignSelf']>;
};
type AtomRestStyleProps<T extends Tokens = Tokens> = Omit<
  {
    [key in CSSPropertiesKeys]?: T[key] extends TokenKeys
      ? TokenKeyExtends<keyof T[key]>
      : AllowFalse<CSSProperties[key]>;
  },
  CSSSpacingPropertiesKeys | CSSColorPropertiesKeys | keyof AtomCustomStyleProps
>;
export type AtomStyleProps<T extends Tokens = Tokens> = AtomSpacingStyleProps<T> &
  AtomColorStyleProps<T> &
  AtomRestStyleProps<T> &
  AtomCustomStyleProps<T>;

export type AtomPseudoClassProps<T extends Tokens = Tokens> = {
  hover?: AtomStyleProps<T>;
  active?: AtomStyleProps<T>;
  focus?: AtomStyleProps<T>;
  focusWithin?: AtomStyleProps<T>;
};

export type PseudoClassStyle = { [key in keyof AtomPseudoClassProps<Tokens>]?: CSSProperties };

export type AtomHtmlProps = Omit<HTMLProps<HTMLElement>, 'as'>;
export type AtomProps<T extends Tokens = Tokens> = AtomStyleProps<T> &
  AtomPseudoClassProps<T> &
  AtomHtmlProps & { as?: ElementType };
