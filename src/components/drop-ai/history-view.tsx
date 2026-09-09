import { StyleSheet, Text, View } from 'react-native';

import { Avatar, Tap } from './primitives';

import { Colors, Fonts, Shadows } from '@/constants/theme';
import { historyGroups } from '@/data/drop-ai-mock';

export function HistoryView({
  cleared,
  onClearAll,
  onOpen,
}: {
  cleared: boolean;
  onClearAll: () => void;
  onOpen: (title: string) => void;
}) {
  return (
    <View>
      <View style={styles.head}>
        <Text style={styles.title}>Chat history</Text>
        <Tap scale={0.95} accessibilityRole="button" onPress={onClearAll}>
          <Text style={styles.clearAll}>Clear all</Text>
        </Tap>
      </View>

      {cleared ? (
        <View style={styles.empty}>
          <Avatar size={56} glyph={30} background={Colors.hatchLight} opacity={0.5} />
          <Text style={styles.emptyTitle}>No conversations yet</Text>
          <Text style={styles.emptyBody}>
            Ask Drop AI for a recipe, a deal or a reorder and it’ll show up here.
          </Text>
        </View>
      ) : (
        <View style={styles.groups}>
          {historyGroups.map((group) => (
            <View key={group.when} style={styles.group}>
              <Text style={styles.groupLabel}>{group.when.toUpperCase()}</Text>
              {group.chats.map((chat) => (
                <Tap
                  key={chat.id}
                  scale={0.98}
                  style={styles.row}
                  accessibilityRole="button"
                  onPress={() => onOpen(chat.title)}>
                  <Avatar size={36} glyph={24} />
                  <View style={styles.rowBody}>
                    <View style={styles.rowHead}>
                      <Text style={styles.rowTitle} numberOfLines={1}>
                        {chat.title}
                      </Text>
                      <Text style={styles.rowTime}>{chat.time}</Text>
                    </View>
                    <Text style={styles.rowPreview} numberOfLines={2}>
                      {chat.preview}
                    </Text>
                    <Text style={styles.rowCount}>{chat.count}</Text>
                  </View>
                </Tap>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: Colors.nearBlack,
  },
  clearAll: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Colors.red,
  },
  groups: {
    gap: 22,
  },
  group: {
    gap: 10,
  },
  groupLabel: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    letterSpacing: 0.66,
    color: Colors.mutedTeal,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    boxShadow: Shadows.row,
  },
  rowBody: {
    flex: 1,
  },
  rowHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  rowTitle: {
    flex: 1,
    fontFamily: Fonts.bold,
    fontSize: 14.5,
    color: Colors.nearBlack,
  },
  rowTime: {
    fontFamily: Fonts.regular,
    fontSize: 11.5,
    color: Colors.mutedTeal,
  },
  rowPreview: {
    fontFamily: Fonts.regular,
    fontSize: 12.5,
    lineHeight: 17,
    color: Colors.mutedTeal,
    marginTop: 3,
  },
  rowCount: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Colors.green,
    marginTop: 6,
  },
  empty: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 70,
    gap: 14,
  },
  emptyTitle: {
    fontFamily: Fonts.extrabold,
    fontSize: 17,
    color: Colors.ink,
  },
  emptyBody: {
    fontFamily: Fonts.medium,
    fontSize: 13.5,
    lineHeight: 19,
    color: Colors.mutedTeal,
    textAlign: 'center',
    maxWidth: 240,
  },
});
