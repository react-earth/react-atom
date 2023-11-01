import { CSSProperties, ElementType, HTMLProps } from 'react';
import { Path } from 'object-standard-path';
import {
  ATOM_CSS_COLOR_PROPERTIES,
  ATOM_CSS_PROPERTIES,
  ATOM_CSS_SPACING_PROPERTIES,
  ATOM_PSEUDO_CLASSES,
  ATOM_PSEUDO_ELEMENTS,
} from './constants';

// covert readonly array to array values type
type ArrayValuesType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer V> ? V : never;

// keep auto-completion, and allow using custom string
type AllowCustomString<T> = T | (string & {});

// override type
type Override<T, P> = Omit<T, keyof P> & P;

type AtomCSSPropertiesKeys = ArrayValuesType<typeof ATOM_CSS_PROPERTIES>;
type AtomCSSColorPropertiesKeys = ArrayValuesType<typeof ATOM_CSS_COLOR_PROPERTIES>;
type AtomCSSSpacingPropertiesKeys = ArrayValuesType<typeof ATOM_CSS_SPACING_PROPERTIES>;
type AtomPseudoClassKeys = ArrayValuesType<typeof ATOM_PSEUDO_CLASSES>;
type AtomPseudoElementKeys = ArrayValuesType<typeof ATOM_PSEUDO_ELEMENTS>;

export type AtomTokens = { [key in AtomCSSPropertiesKeys]?: object } & {
  color?: object;
  spacing?: object;
};

type AtomColorToken<T extends AtomTokens = AtomTokens> = AllowCustomString<Path<T['color']>>;
// allow spacing use number directly
type AtomSpacingToken<T extends AtomTokens = AtomTokens> = AllowCustomString<Path<T['spacing']>> | number;

// atom color style props
type AtomColorStyleProps<T extends AtomTokens = AtomTokens> = {
  [key in AtomCSSColorPropertiesKeys]?: AtomColorToken<T>;
};

// atom spacing style props
type AtomSpacingStyleProps<T extends AtomTokens = AtomTokens> = {
  [key in AtomCSSSpacingPropertiesKeys]?: AtomSpacingToken<T>;
};

// atom custom style props
export type AtomCustomStyleProps<T extends AtomTokens = AtomTokens> = {
  w?: AtomSpacingToken<T>;
  minW?: AtomSpacingToken<T>;
  maxW?: AtomSpacingToken<T>;
  h?: AtomSpacingToken<T>;
  minH?: AtomSpacingToken<T>;
  maxH?: AtomSpacingToken<T>;
  m?: AtomSpacingToken<T>;
  mx?: AtomSpacingToken<T>;
  my?: AtomSpacingToken<T>;
  ml?: AtomSpacingToken<T>;
  mr?: AtomSpacingToken<T>;
  mt?: AtomSpacingToken<T>;
  mb?: AtomSpacingToken<T>;
  p?: AtomSpacingToken<T>;
  px?: AtomSpacingToken<T>;
  py?: AtomSpacingToken<T>;
  pl?: AtomSpacingToken<T>;
  pr?: AtomSpacingToken<T>;
  pt?: AtomSpacingToken<T>;
  pb?: AtomSpacingToken<T>;
  c?: AtomColorToken<T>;
  bg?: AtomColorToken<T>;
  flex?: boolean;
  flexJustify?: CSSProperties['justifyContent'];
  flexAlign?: CSSProperties['alignItems'];
  grid?: boolean;
  gridColumns?: number;
  gridRows?: number;
  gridJustify?: CSSProperties['justifyItems'];
  gridAlign?: CSSProperties['alignItems'];
  gridSelfColumns?: number;
  gridSelfRows?: number;
  gridSelfJustify?: CSSProperties['justifySelf'];
  gridSelfAlign?: CSSProperties['alignSelf'];
};

// atom rest style props
type AtomRestStyleProps<T extends AtomTokens = AtomTokens> = {
  [key in Exclude<
    AtomCSSPropertiesKeys,
    AtomCSSColorPropertiesKeys | AtomCSSSpacingPropertiesKeys | keyof AtomCustomStyleProps
  >]?: key extends keyof T ? Path<T[key]> : CSSProperties[key];
};

// all atom style props
export type AtomStyleProps<T extends AtomTokens = AtomTokens> = AtomColorStyleProps<T> &
  AtomSpacingStyleProps<T> &
  AtomCustomStyleProps<T> &
  AtomRestStyleProps<T>;

// atom pseudo class props
export type AtomPseudoClassProps<T extends AtomTokens = AtomTokens> = {
  [key in AtomPseudoClassKeys]?: AtomStyleProps<T>;
};

// atom pseudo element props
export type AtomPseudoElementProps<T extends AtomTokens = AtomTokens> = {
  [key in AtomPseudoElementKeys]?: AtomStyleProps<T>;
};

// atom props
export type AtomProps<T extends AtomTokens = AtomTokens> = Override<
  HTMLProps<HTMLElement>,
  AtomStyleProps<T> &
    AtomPseudoClassProps<T> &
    AtomPseudoElementProps<T> & {
      as?: ElementType;
    }
>;
