import { useState } from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Hatch, Initials, Tap } from './primitives';

import { Colors, Fonts, Gutter, Shadows } from '@/constants/theme';
import type { Product, Store } from '@/data/drop-ai-mock';

const CARD_WIDTH = 300;
const CARD_GAP = 14;
const SNAP = CARD_WIDTH + CARD_GAP;
const HIT = { top: 7, bottom: 7, left: 7, right: 7 };

export function StoreCarousel({
  stores,
  deals,
  onAdd,
}: {
  stores: Store[];
  deals?: boolean;
  onAdd: (label: string) => void;
}) {
  const [active, setActive] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActive(Math.round(event.nativeEvent.contentOffset.x / SNAP));
  };

  return (
    <View>
      <ScrollView
        horizontal
        style={styles.carousel}
        contentContainerStyle={styles.carouselContent}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={onScroll}>
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} deals={deals} onAdd={onAdd} />
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {stores.map((store, index) => (
          <View
            key={store.id}
            style={[styles.dot, index === active ? styles.dotActive : styles.dotInactive]}
          />
        ))}
      </View>
    </View>
  );
}

function StoreCard({
  store,
  deals,
  onAdd,
}: {
  store: Store;
  deals?: boolean;
  onAdd: (label: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Hatch style={styles.photo} label="SHOP PHOTO">
        <View style={styles.dealBadge}>
          <Text style={styles.dealLabel}>{store.deal}</Text>
        </View>
      </Hatch>

      <View style={styles.body}>
        <View style={styles.identity}>
          <Initials text={store.initials} size={44} background={Colors.green} />
          <View style={styles.identityText}>
            <Text style={styles.name} numberOfLines={1}>
              {store.name}
            </Text>
            <Text style={styles.rating}>
              ⭐ {store.rating} <Text style={styles.reviews}>({store.reviews})</Text>
            </Text>
          </View>
        </View>

        <Text style={styles.meta}>
          {store.cuisine} · ⏱ {store.eta} · 📍 {store.dist}
        </Text>
        <Text style={[styles.meta, styles.metaLast]}>
          🚲 {store.delivery} · 🧺 {store.min}
        </Text>

        <Text style={styles.railEyebrow}>{deals ? 'ON PROMOTION' : 'IN STOCK HERE'}</Text>

        <ScrollView
          horizontal
          style={styles.rail}
          contentContainerStyle={styles.railContent}
          showsHorizontalScrollIndicator={false}>
          {store.products.map((product) => (
            <ProductTile key={product.id} product={product} deals={deals} onAdd={onAdd} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

function ProductTile({
  product,
  deals,
  onAdd,
}: {
  product: Product;
  deals?: boolean;
  onAdd: (label: string) => void;
}) {
  return (
    <View style={styles.tile}>
      <Hatch style={styles.tileImage}>
        {product.badge ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountLabel}>{product.badge}</Text>
          </View>
        ) : null}
        <Tap
          scale={0.88}
          hitSlop={HIT}
          style={styles.tileAdd}
          accessibilityRole="button"
          accessibilityLabel={`Add ${product.label} to basket`}
          onPress={() => onAdd(product.label)}>
          <Text style={styles.tileAddGlyph}>+</Text>
        </Tap>
      </Hatch>

      <Text style={styles.tileLabel} numberOfLines={2}>
        {product.label}
      </Text>
      <Text style={[styles.tilePrice, deals && styles.tilePriceSale]}>
        {product.price}
        {product.was ? <Text style={styles.tileWas}> {product.was}</Text> : null}
        {product.unit ? <Text style={styles.tileUnit}>{product.unit}</Text> : null}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    marginHorizontal: -Gutter,
  },
  carouselContent: {
    paddingHorizontal: Gutter,
    paddingTop: 2,
    paddingBottom: 6,
    gap: CARD_GAP,
  },
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
    paddingTop: 12,
    paddingBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: Colors.ink,
  },
  dotInactive: {
    backgroundColor: Colors.disabled,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
    boxShadow: Shadows.storeCard,
  },
  photo: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dealLabel: {
    fontFamily: Fonts.extrabold,
    fontSize: 11,
    color: Colors.nearBlack,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  identityText: {
    flex: 1,
  },
  name: {
    fontFamily: Fonts.extrabold,
    fontSize: 18,
    color: Colors.ink,
  },
  rating: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.ink,
    marginTop: 3,
  },
  reviews: {
    fontFamily: Fonts.semibold,
    color: Colors.muted,
  },
  meta: {
    fontFamily: Fonts.semibold,
    fontSize: 12.5,
    color: Colors.meta,
    marginTop: 5,
  },
  metaLast: {
    marginBottom: 12,
  },
  railEyebrow: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    letterSpacing: 0.55,
    color: Colors.eyebrow,
    marginBottom: 8,
  },
  rail: {
    marginHorizontal: -16,
  },
  railContent: {
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 4,
    gap: 12,
  },
  tile: {
    width: 116,
  },
  tileImage: {
    height: 90,
    borderRadius: 12,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  tileAdd: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileAddGlyph: {
    fontFamily: Fonts.regular,
    fontSize: 20,
    lineHeight: 24,
    color: Colors.surface,
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: Colors.red,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  discountLabel: {
    fontFamily: Fonts.bold,
    fontSize: 9.5,
    color: Colors.surface,
  },
  tileLabel: {
    fontFamily: Fonts.bold,
    fontSize: 12.5,
    lineHeight: 15.5,
    color: Colors.ink,
    minHeight: 31,
    marginTop: 7,
  },
  tilePrice: {
    fontFamily: Fonts.extrabold,
    fontSize: 13,
    color: Colors.price,
    marginTop: 3,
  },
  tilePriceSale: {
    color: Colors.red,
  },
  tileWas: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.mutedTeal,
    textDecorationLine: 'line-through',
  },
  tileUnit: {
    fontFamily: Fonts.semibold,
    fontSize: 11,
    color: Colors.muted,
  },
});
