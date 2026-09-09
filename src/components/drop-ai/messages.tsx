import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Keyframe,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Avatar, Tap } from './primitives';

import { Colors, Ease, Fonts, Motion, Shadows } from '@/constants/theme';
import { errorState, thinkingLabel } from '@/data/drop-ai-mock';

export const enterMessage = new Keyframe({
  0: { opacity: 0, transform: [{ translateY: 10 }] },
  100: { opacity: 1, transform: [{ translateY: 0 }], easing: Ease },
}).duration(Motion.message);

export function UserBubble({ text }: { text: string }) {
  return (
    <View style={styles.userRow}>
      <View style={styles.userBubble}>
        <Text style={styles.userText}>{text}</Text>
      </View>
    </View>
  );
}

export function AssistantText({ text }: { text: string }) {
  return (
    <View style={styles.assistantRow}>
      <Avatar size={26} glyph={17} />
      <Text style={styles.assistantText}>{text}</Text>
    </View>
  );
}

function Dot({ delay }: { delay: number }) {
  const progress = useSharedValue(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    progress.value = withDelay(
      delay,
      withRepeat(
        withSequence(withTiming(1, { duration: 550 }), withTiming(0, { duration: 550 })),
        -1
      )
    );
  }, [delay, progress, reduced]);

  const animated = useAnimatedStyle(() => ({
    opacity: 0.35 + 0.65 * progress.value,
    transform: [{ translateY: -4 * progress.value }],
  }));

  return <Animated.View style={[styles.dot, animated]} />;
}

export function Thinking() {
  return (
    <View style={styles.thinkingRow}>
      <Avatar size={26} glyph={17} />
      <View style={styles.thinkingBubble} accessibilityLabel={thinkingLabel}>
        <Dot delay={0} />
        <Dot delay={150} />
        <Dot delay={300} />
      </View>
      <Text style={styles.thinkingLabel}>{thinkingLabel}</Text>
    </View>
  );
}

export function ErrorTurn({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={styles.errorRow}>
      <View style={styles.errorAvatar}>
        <Text style={styles.errorGlyph}>!</Text>
      </View>
      <View style={styles.errorCard}>
        <Text style={styles.errorTitle}>{errorState.title}</Text>
        <Text style={styles.errorBody}>{errorState.body}</Text>
        <Tap
          scale={0.95}
          style={styles.retry}
          accessibilityRole="button"
          onPress={onRetry}>
          <Text style={styles.retryLabel}>{errorState.retry}</Text>
        </Tap>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userRow: {
    alignItems: 'flex-end',
    marginBottom: 18,
  },
  userBubble: {
    maxWidth: '82%',
    backgroundColor: Colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 22,
    boxShadow: Shadows.chip,
  },
  userText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.ink,
  },
  assistantRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  assistantText: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 23.2,
    color: Colors.ink,
  },
  thinkingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  thinkingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.ink,
  },
  thinkingLabel: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Colors.muted,
  },
  errorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  errorAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorGlyph: {
    fontFamily: Fonts.extrabold,
    fontSize: 15,
    color: Colors.surface,
  },
  errorCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderLeftWidth: 3,
    borderLeftColor: Colors.red,
    paddingHorizontal: 17,
    paddingVertical: 15,
  },
  errorTitle: {
    fontFamily: Fonts.extrabold,
    fontSize: 15,
    color: Colors.nearBlack,
  },
  errorBody: {
    fontFamily: Fonts.medium,
    fontSize: 13.5,
    lineHeight: 19,
    color: Colors.mutedTeal,
    marginTop: 4,
  },
  retry: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.ink,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 9,
    marginTop: 12,
  },
  retryLabel: {
    fontFamily: Fonts.bold,
    fontSize: 13.5,
    color: Colors.surface,
  },
});
