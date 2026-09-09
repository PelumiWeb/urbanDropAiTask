import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Keyframe,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Tap } from './primitives';

import { Colors, Ease, Fonts, Motion, Shadows } from '@/constants/theme';
import { voice } from '@/data/drop-ai-mock';

const fill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;

const BAR_DURATIONS = [900, 1240, 700, 1080, 780, 1160, 860, 1000, 740];

const rise = (offset: number, duration: number) =>
  new Keyframe({
    0: { opacity: 0, transform: [{ translateY: offset }] },
    100: { opacity: 1, transform: [{ translateY: 0 }], easing: Ease },
  }).duration(duration);

function WaveBar({ duration, delay }: { duration: number; delay: number }) {
  const scale = useSharedValue(0.3);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: duration / 2 }),
          withTiming(0.3, { duration: duration / 2 })
        ),
        -1
      )
    );
  }, [delay, duration, reduced, scale]);

  const animated = useAnimatedStyle(() => ({ transform: [{ scaleY: scale.value }] }));

  return <Animated.View style={[styles.bar, animated]} />;
}

function PulseRing() {
  const progress = useSharedValue(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    progress.value = withRepeat(withTiming(1, { duration: 1800 }), -1);
  }, [progress, reduced]);

  const animated = useAnimatedStyle(() => ({
    opacity: 0.45 * (1 - progress.value),
    transform: [{ scale: 1 + 0.44 * progress.value }],
  }));

  return <Animated.View pointerEvents="none" style={[styles.pulse, animated]} />;
}

export function VoiceSheet({ onCancel, onStop }: { onCancel: () => void; onStop: () => void }) {
  return (
    <View style={styles.voiceLayer}>
      <Pressable
        style={styles.scrimHeavy}
        accessibilityRole="button"
        accessibilityLabel="Dismiss voice capture"
        onPress={onCancel}
      />
      <Animated.View
        style={styles.voiceSheet}
        entering={SlideInDown.duration(Motion.sheet).easing(Ease)}
        exiting={SlideOutDown.duration(Motion.sheet).easing(Ease)}>
        <View style={styles.handle} />
        <Text style={styles.listening}>{voice.listeningLabel}</Text>

        <View style={styles.wave}>
          {BAR_DURATIONS.map((duration, index) => (
            <WaveBar key={index} duration={duration} delay={index * 70} />
          ))}
        </View>

        <Text style={styles.hint}>{voice.hint}</Text>

        <View style={styles.voiceActions}>
          <Tap style={styles.cancel} accessibilityRole="button" onPress={onCancel}>
            <Text style={styles.cancelLabel}>Cancel</Text>
          </Tap>
          <View>
            <PulseRing />
            <Tap
              scale={0.94}
              style={styles.stop}
              accessibilityRole="button"
              accessibilityLabel="Stop recording"
              onPress={onStop}>
              <View style={styles.stopGlyph} />
            </Tap>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

export function OverflowMenu({
  top,
  onDismiss,
  onHistory,
  onNewChat,
  onClear,
}: {
  top: number;
  onDismiss: () => void;
  onHistory: () => void;
  onNewChat: () => void;
  onClear: () => void;
}) {
  const items = [
    { icon: '🕒', label: 'Chat history', color: Colors.ink, onPress: onHistory },
    { icon: '✎', label: 'New chat', color: Colors.ink, onPress: onNewChat },
    { icon: '🗑', label: 'Clear conversation', color: Colors.red, onPress: onClear },
  ];

  return (
    <View style={styles.menuLayer}>
      <Pressable
        style={styles.scrimLight}
        accessibilityRole="button"
        accessibilityLabel="Dismiss menu"
        onPress={onDismiss}
      />
      <Animated.View style={[styles.menu, { top }]} entering={rise(-8, Motion.menu)}>
        {items.map((item, index) => (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            onPress={item.onPress}
            style={({ pressed }) => [
              styles.menuRow,
              index < items.length - 1 && styles.menuDivider,
              pressed && styles.menuRowPressed,
            ]}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={[styles.menuLabel, { color: item.color }]}>{item.label}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
}

export function Toast({ message, bottom }: { message: string; bottom: number }) {
  return (
    <Animated.View
      pointerEvents="none"
      accessibilityLiveRegion="polite"
      style={[styles.toast, { bottom }]}
      entering={rise(8, Motion.toast)}>
      <View style={styles.toastCheck}>
        <Text style={styles.toastCheckGlyph}>✓</Text>
      </View>
      <Text style={styles.toastLabel}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  voiceLayer: {
    ...fill,
    zIndex: 40,
    justifyContent: 'flex-end',
  },
  menuLayer: {
    ...fill,
    zIndex: 30,
  },
  scrimHeavy: {
    ...fill,
    backgroundColor: Colors.scrimHeavy,
  },
  scrimLight: {
    ...fill,
    backgroundColor: Colors.scrimLight,
  },
  voiceSheet: {
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 34,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E4E0D8',
  },
  listening: {
    fontFamily: Fonts.extrabold,
    fontSize: 19,
    color: Colors.ink,
    marginTop: 6,
  },
  wave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 52,
  },
  bar: {
    width: 5,
    height: 44,
    borderRadius: 3,
    backgroundColor: Colors.green,
  },
  hint: {
    fontFamily: Fonts.medium,
    fontSize: 14.5,
    lineHeight: 21,
    color: Colors.mutedTeal,
    textAlign: 'center',
    maxWidth: 260,
  },
  voiceActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 4,
  },
  cancel: {
    backgroundColor: Colors.panel,
    borderRadius: 30,
    paddingHorizontal: 26,
    paddingVertical: 14,
  },
  cancelLabel: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.ink,
  },
  stop: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopGlyph: {
    width: 18,
    height: 18,
    borderRadius: 3,
    backgroundColor: Colors.surface,
  },
  pulse: {
    ...fill,
    borderRadius: 32,
    backgroundColor: Colors.green,
  },
  menu: {
    position: 'absolute',
    right: 16,
    width: 240,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    overflow: 'hidden',
    boxShadow: Shadows.menu,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 17,
    paddingVertical: 14,
  },
  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairlineMenu,
  },
  menuRowPressed: {
    backgroundColor: Colors.pressBg,
  },
  menuIcon: {
    fontSize: 16,
    width: 20,
    textAlign: 'center',
  },
  menuLabel: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.ink,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    boxShadow: Shadows.toast,
  },
  toastCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastCheckGlyph: {
    fontSize: 11,
    lineHeight: 14,
    color: Colors.surface,
  },
  toastLabel: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.surface,
  },
});
