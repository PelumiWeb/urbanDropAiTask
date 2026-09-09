/**
 * UrbanDrop design tokens.
 * Source: UrbanDrop.fig via design_handoff_drop_ai_chat/prototype/_ds/urbandrop/colors_and_type.css
 */

import { Easing } from 'react-native-reanimated';

export const Colors = {
  green: '#5CB35E',
  greenDark: '#183A37',
  greenHeader: '#14352B',
  nearBlack: '#080707',
  ink: '#16241D',
  mutedTeal: '#879EA4',
  muted: '#8B968F',
  meta: '#5A6B62',
  eyebrow: '#9AA39D',
  price: '#12A150',
  red: '#F74242',
  yellow: '#FAD338',
  panel: '#F3EFE9',
  surface: '#FFFFFF',
  disabled: '#CFC9BF',
  hatchLight: '#E7E2DA',
  hatchDark: '#DED8CF',
  hairline: '#F2EFE9',
  hairlineMenu: '#F4F2EE',
  pressBg: '#FAF8F4',
  scrimHeavy: 'rgba(8,7,7,0.45)',
  scrimLight: 'rgba(8,7,7,0.18)',
} as const;

/** Red Hat Display statics — separate families because Android cannot synthesise weights. */
export const Fonts = {
  regular: 'RedHatDisplay-Regular',
  medium: 'RedHatDisplay-Medium',
  semibold: 'RedHatDisplay-SemiBold',
  bold: 'RedHatDisplay-Bold',
  extrabold: 'RedHatDisplay-ExtraBold',
  black: 'RedHatDisplay-Black',
} as const;

export const Shadows = {
  chip: '0px 4px 12px -6px rgba(8,7,7,0.18)',
  pill: '0px 4px 12px -6px rgba(8,7,7,0.2)',
  card: '0px 6px 18px -12px rgba(8,7,7,0.28)',
  row: '0px 6px 18px -13px rgba(8,7,7,0.3)',
  storeCard: '0px 10px 26px -14px rgba(8,7,7,0.35)',
  toast: '0px 12px 28px -12px rgba(8,7,7,0.6)',
  menu: '0px 18px 40px -14px rgba(8,7,7,0.4)',
  sheet: '0px -12px 34px -14px rgba(8,7,7,0.28)',
} as const;

export const Gutter = 20;

export const Ease = Easing.bezier(0.22, 0.61, 0.36, 1);

export const Motion = {
  message: 280,
  sheet: 240,
  menu: 180,
  toast: 200,
  toastHold: 1800,
} as const;
