import { StyleSheet, Text, View } from 'react-native';

import { Avatar, Tap } from './primitives';

import { Colors, Fonts } from '@/constants/theme';

export function Header({ onBack, onMenu }: { onBack: () => void; onMenu: () => void }) {
  return (
    <View style={styles.header}>
      <Tap
        scale={0.85}
        style={styles.iconButton}
        accessibilityRole="button"
        accessibilityLabel="Back"
        onPress={onBack}>
        <View style={styles.chevron} />
      </Tap>

      <View style={styles.cluster}>
        <Avatar size={24} glyph={19} />
        <Text style={styles.title}>Drop AI</Text>
        <View style={styles.betaPill}>
          <Text style={styles.betaLabel}>BETA</Text>
        </View>
      </View>

      <Tap
        scale={0.85}
        style={styles.iconButton}
        accessibilityRole="button"
        accessibilityLabel="More"
        onPress={onMenu}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </Tap>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },
  iconButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  chevron: {
    width: 11,
    height: 11,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.ink,
    transform: [{ rotate: '45deg' }, { translateX: 2 }],
  },
  dot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: Colors.ink,
  },
  cluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: Fonts.extrabold,
    fontSize: 16,
    color: Colors.ink,
  },
  betaPill: {
    backgroundColor: 'rgba(92,179,94,0.14)',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  betaLabel: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    letterSpacing: 0.8,
    color: Colors.green,
  },
});
