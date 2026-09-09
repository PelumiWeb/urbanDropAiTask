import { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Tap } from './primitives';

import { Colors, Ease, Fonts, Shadows } from '@/constants/theme';

export function Composer({
  draft,
  basketCount,
  bottomInset,
  onChangeDraft,
  onFocus,
  onBlur,
  onSend,
  onVoice,
  onBasket,
}: {
  draft: string;
  basketCount: number;
  bottomInset: number;
  onChangeDraft: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSend: () => void;
  onVoice: () => void;
  onBasket: () => void;
}) {
  const ready = draft.trim().length > 0;

  return (
    <View style={[styles.composer, { paddingBottom: 22 + bottomInset }]}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={onChangeDraft}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={onSend}
          placeholder="Ask anything…"
          placeholderTextColor={Colors.muted}
          returnKeyType="send"
          submitBehavior="submit"
          autoCorrect={false}
          accessibilityLabel="Ask Drop AI"
        />
        <Tap
          scale={0.9}
          style={[styles.send, { backgroundColor: ready ? Colors.green : Colors.disabled }]}
          accessibilityRole="button"
          accessibilityLabel="Send"
          onPress={onSend}>
          <Text style={styles.sendGlyph}>↑</Text>
        </Tap>
      </View>

      <View style={styles.actionRow}>
        <Tap
          style={styles.voicePill}
          accessibilityRole="button"
          accessibilityLabel="Voice chat"
          onPress={onVoice}>
          <Text style={styles.voiceGlyph}>🎙</Text>
          <Text style={styles.voiceLabel}>Voice chat</Text>
        </Tap>

        <Tap
          scale={0.92}
          style={styles.fab}
          accessibilityRole="button"
          accessibilityLabel={`Basket, ${basketCount} items`}
          onPress={onBasket}>
          <Text style={styles.fabGlyph}>🧺</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>{basketCount}</Text>
          </View>
        </Tap>
      </View>
    </View>
  );
}

/** Options sheet. Opened by a mode chip with the full term list, or by typing (filtered). */
export function OptionsSheet({
  matches,
  prefix,
  onSelect,
  onDismiss,
}: {
  matches: string[];
  prefix: string;
  onSelect: (term: string) => void;
  onDismiss: () => void;
}) {
  const { height } = useWindowDimensions();
  const reduced = useReducedMotion();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = reduced ? 1 : withTiming(1, { duration: 220, easing: Ease });
  }, [progress, reduced]);

  const slide = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - progress.value) * height }],
  }));

  return (
    <Animated.View style={[styles.sheet, slide]}>
      <Tap
        scale={1}
        style={styles.handleWrap}
        accessibilityRole="button"
        accessibilityLabel="Dismiss options"
        onPress={onDismiss}>
        <View style={styles.handle} />
      </Tap>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {matches.map((term) => (
          <Tap
            key={term}
            scale={1}
            style={styles.suggestion}
            accessibilityRole="button"
            onPress={() => onSelect(term)}>
            <Text style={styles.suggestionPrefix}>
              {prefix} <Text style={styles.suggestionTerm}>{term}</Text>
            </Text>
          </Tap>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  composer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.6)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 28,
    paddingLeft: 18,
    paddingRight: 7,
    paddingVertical: 7,
    marginBottom: 13,
    boxShadow: Shadows.pill,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.ink,
    paddingVertical: 9,
  },
  send: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendGlyph: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.surface,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voicePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.surface,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    boxShadow: Shadows.pill,
  },
  voiceGlyph: {
    fontSize: 16,
  },
  voiceLabel: {
    fontFamily: Fonts.extrabold,
    fontSize: 15,
    color: Colors.ink,
  },
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabGlyph: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: Colors.nearBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontFamily: Fonts.extrabold,
    fontSize: 11,
    color: Colors.surface,
  },
  sheet: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 42,
    borderBottomRightRadius: 42,
    boxShadow: Shadows.sheet,
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 6,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E4E0D8',
  },
  suggestion: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  suggestionPrefix: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.muted,
  },
  suggestionTerm: {
    fontFamily: Fonts.bold,
    color: Colors.ink,
  },
});
