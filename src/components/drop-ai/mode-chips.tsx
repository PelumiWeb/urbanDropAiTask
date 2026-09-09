import { StyleSheet, Text, View } from 'react-native';

import { Tap } from './primitives';

import { Colors, Fonts, Shadows } from '@/constants/theme';
import { starterPrompts, type StarterPrompt } from '@/data/drop-ai-mock';

/** The four entry modes. Dimmed and pinned above the transcript once a conversation exists. */
export function ModeChips({
  dimmed,
  onPick,
}: {
  dimmed?: boolean;
  onPick: (prompt: StarterPrompt) => void;
}) {
  return (
    <View style={[styles.row, dimmed && styles.rowPinned]}>
      {starterPrompts.map((prompt) => (
        <Tap
          key={prompt.id}
          style={[styles.chip, dimmed && styles.chipDimmed]}
          accessibilityRole="button"
          onPress={() => onPick(prompt)}>
          <Text style={styles.label} numberOfLines={1}>
            {prompt.label}
          </Text>
        </Tap>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 11,
  },
  rowPinned: {
    marginBottom: 22,
  },
  chip: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 11,
    boxShadow: Shadows.chip,
  },
  chipDimmed: {
    opacity: 0.55,
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.ink,
  },
});
