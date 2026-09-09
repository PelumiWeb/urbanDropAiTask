import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Tap } from '@/components/drop-ai/primitives';
import { Colors, Fonts } from '@/constants/theme';
import { user } from '@/data/drop-ai-mock';

const LOGO = require('@/assets/images/urbandrop/logo-mark.png');
const CART = require('@/assets/images/urbandrop/icon-cart.png');
const BELL = require('@/assets/images/urbandrop/icon-bell.png');

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerRow}>
          <View style={styles.deliverTo}>
            <Text style={styles.deliverLabel}>DELIVER TO</Text>
            <Text style={styles.address} numberOfLines={1}>
              {user.address}
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <Image source={BELL} style={styles.headerIcon} contentFit="contain" tintColor="#fff" />
            <View>
              <Image source={CART} style={styles.headerIcon} contentFit="contain" tintColor="#fff" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartCount}>{user.basketCount}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Text style={styles.searchGlyph}>🔎</Text>
          <Text style={styles.searchPlaceholder}>Search stores &amp; products</Text>
          <Tap
            scale={0.9}
            style={styles.aiButton}
            accessibilityRole="button"
            accessibilityLabel="Open Drop AI"
            onPress={() => router.push('/drop-ai')}>
            <Image source={LOGO} style={styles.aiGlyph} contentFit="contain" />
          </Tap>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.bodyText}>
          Tap the Drop AI button in the search bar to open the shopping assistant.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F6F7F6',
  },
  header: {
    backgroundColor: Colors.greenHeader,
    paddingHorizontal: 18,
    paddingBottom: 15,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  deliverTo: {
    flex: 1,
    gap: 1,
  },
  deliverLabel: {
    fontFamily: Fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 0.63,
    color: '#9FC5AD',
  },
  address: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.surface,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerIcon: {
    width: 19,
    height: 19,
  },
  cartBadge: {
    position: 'absolute',
    top: -7,
    right: -9,
    backgroundColor: '#E23B3B',
    borderRadius: 9,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  cartCount: {
    fontFamily: Fonts.extrabold,
    fontSize: 10,
    color: Colors.surface,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.surface,
    borderRadius: 26,
    paddingLeft: 18,
    paddingRight: 8,
    paddingVertical: 8,
  },
  searchGlyph: {
    fontSize: 15,
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: Colors.eyebrow,
  },
  aiButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.greenDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiGlyph: {
    width: 24,
    height: 24,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  bodyText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.meta,
    textAlign: 'center',
  },
});
