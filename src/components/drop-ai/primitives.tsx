import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

import { Colors, Fonts, Shadows } from '@/constants/theme';

const LOGO = require('@/assets/images/urbandrop/logo-mark.png');

/** repeating-linear-gradient(135deg, #E7E2DA 0 12px, #DED8CF 12px 24px) as explicit stops. */
const HATCH_STOPS = Array.from({ length: 40 }, (_, i) => {
  const color = i % 2 ? Colors.hatchDark : Colors.hatchLight;
  return `${color} ${i * 12}px ${(i + 1) * 12}px`;
}).join(', ');

export function Hatch({
  style,
  label,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  label?: string;
  children?: ReactNode;
}) {
  return (
    <View style={[styles.hatch, style]}>
      {label ? <Text style={styles.hatchLabel}>{label}</Text> : null}
      {children}
    </View>
  );
}

export function Avatar({
  size,
  glyph,
  background = Colors.greenDark,
  opacity,
}: {
  size: number;
  glyph: number;
  background?: string;
  opacity?: number;
}) {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: background },
      ]}>
      <Image source={LOGO} style={{ width: glyph, height: glyph, opacity }} contentFit="contain" />
    </View>
  );
}

export function Initials({
  text,
  size,
  background,
}: {
  text: string;
  size: number;
  background: string;
}) {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: background },
      ]}>
      <Text style={styles.initials}>{text}</Text>
    </View>
  );
}

export function Eyebrow({ children, style }: { children: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={style}>
      <Text style={styles.eyebrow}>{children}</Text>
    </View>
  );
}

type TapProps = PressableProps & {
  scale?: number;
  style?: StyleProp<ViewStyle>;
};

/** Pressable with the design system's press-scale feedback. */
export function Tap({ scale = 0.97, style, children, ...rest }: TapProps) {
  return (
    <Pressable style={({ pressed }) => [style, pressed && { transform: [{ scale }] }]} {...rest}>
      {children}
    </Pressable>
  );
}

export function FollowUps({
  items,
  onPress,
}: {
  items: string[];
  onPress: (label: string) => void;
}) {
  return (
    <View style={styles.followUps}>
      {items.map((label) => (
        <Tap
          key={label}
          style={styles.followUp}
          accessibilityRole="button"
          onPress={() => onPress(label)}>
          <Text style={styles.followUpLabel}>{label}</Text>
        </Tap>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  hatch: {
    backgroundColor: Colors.hatchLight,
    experimental_backgroundImage: `linear-gradient(135deg, ${HATCH_STOPS})`,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hatchLabel: {
    fontFamily: Fonts.bold,
    fontSize: 9,
    letterSpacing: 1.6,
    color: 'rgba(8,7,7,0.16)',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: Fonts.black,
    fontSize: 14,
    color: Colors.surface,
  },
  eyebrow: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: Colors.eyebrow,
  },
  followUps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  followUp: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    boxShadow: Shadows.chip,
  },
  followUpLabel: {
    fontFamily: Fonts.bold,
    fontSize: 13.5,
    color: Colors.ink,
  },
});
