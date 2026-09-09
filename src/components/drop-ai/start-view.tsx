import { StyleSheet, Text, View } from 'react-native';

import { Avatar, Eyebrow, Tap } from './primitives';

import { Colors, Fonts, Shadows } from '@/constants/theme';
import { historyGroups, starterPrompts, type Intent } from '@/data/drop-ai-mock';

export function StartView({
  onPrompt,
  onResume,
}: {
  onPrompt: (label: string, intent: Intent) => void;
  onResume: (title: string) => void;
}) {
  const recent = historyGroups[0].chats.slice(0, 2);

  return (
    <View>
      <Eyebrow style={styles.eyebrow}>TRY ASKING</Eyebrow>
      <View style={styles.chips}>
        {starterPrompts.map((prompt) => (
          <Tap
            key={prompt.id}
            style={styles.chip}
            accessibilityRole="button"
            onPress={() => onPrompt(prompt.label, prompt.intent)}>
            <Text style={styles.chipLabel} numberOfLines={1}>
              {prompt.label}
            </Text>
          </Tap>
        ))}
      </View>

      <Eyebrow style={[styles.eyebrow, styles.eyebrowSpaced]}>PICK UP WHERE YOU LEFT OFF</Eyebrow>
      <View style={styles.recentList}>
        {recent.map((chat) => (
          <Tap
            key={chat.id}
            scale={0.98}
            style={styles.recentRow}
            accessibilityRole="button"
            onPress={() => onResume(chat.title)}>
            <Avatar size={32} glyph={21} />
            <View style={styles.recentBody}>
              <Text style={styles.recentTitle} numberOfLines={1}>
                {chat.title}
              </Text>
              <Text style={styles.recentPreview} numberOfLines={1}>
                {chat.preview}
              </Text>
            </View>
            <Text style={styles.recentTime}>{chat.time}</Text>
          </Tap>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    marginBottom: 11,
  },
  eyebrowSpaced: {
    marginTop: 26,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 11,
    boxShadow: Shadows.chip,
  },
  chipLabel: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.ink,
  },
  recentList: {
    gap: 10,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 13,
    boxShadow: Shadows.row,
  },
  recentBody: {
    flex: 1,
  },
  recentTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.ink,
  },
  recentPreview: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mutedTeal,
    marginTop: 1,
  },
  recentTime: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Colors.mutedTeal,
  },
});
