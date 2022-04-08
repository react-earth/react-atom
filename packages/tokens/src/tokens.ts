import { PALETTE } from './constants';

const fontFamily = {
  default: 'arial,sans-serif',
};

const fontSize = {
  large1: '50px',
  large2: '42px',
  large3: '36px',
  title1: '24px',
  title2: '20px',
  title3: '18px',
  body1: '16px',
  body2: '14px',
  body3: '12px',
  tiny: '10px',
  default: '16px',
};

const lineHeight = {
  narrow: 1,
  compact: 1.3,
  default: 1.5,
};

const fontWeight = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  heavy: 900,
};

const color = {
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',
  ...PALETTE,
  // functional
  primary: PALETTE.blue60,
  primaryActive: PALETTE.blue70,
  primaryDisabled: PALETTE.blue30,
  text: PALETTE.gray100,
  textSecondary: PALETTE.gray80,
  disabled: PALETTE.gray60,
  success: PALETTE.green80,
  danger: PALETTE.red80,
  info: PALETTE.blue80,
  border: PALETTE.gray40,
};

const spacing = {
  fill: '100%',
  widthFull: '100vw',
  heightFull: '100vh',
  // functional
  half: '4px',
  '1x': '8px',
  '2x': '16px',
  '3x': '24px',
  '4x': '32px',
  '8x': '64px',
  border: '1px',
  borderRadius: '2px',
};

const border = {
  default: `solid ${spacing.border} ${color.border}`,
  focus: `solid ${spacing.border} ${color.primary}`,
  danger: `solid ${spacing.border} ${color.danger}`,
  none: `none`,
};

const zIndex = {
  layer1: 100,
  layer2: 200,
  layer3: 300,
  layer4: 400,
  layer5: 500,
  layer6: 600,
  layer7: 700,
  layer8: 800,
  layer9: 900,
};

export const tokens = {
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  color,
  spacing,
  border,
  zIndex,
};
