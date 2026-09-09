import { StyleSheet, Text, View } from 'react-native';

import { Hatch, Initials, Tap } from './primitives';

import { Colors, Fonts, Shadows } from '@/constants/theme';
import { pastOrders, recipeAnswer, type Order } from '@/data/drop-ai-mock';

const HIT = { top: 7, bottom: 7, left: 7, right: 7 };

export function BasketCard({ onAdd }: { onAdd: (label: string) => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardEyebrow}>SUGGESTED BASKET</Text>
        <Text style={styles.cardTotal}>{recipeAnswer.basketTotal}</Text>
      </View>

      <View style={styles.itemList}>
        {recipeAnswer.basket.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Hatch style={styles.itemThumb} />
            <View style={styles.itemBody}>
              <Text style={styles.itemLabel} numberOfLines={1}>
                {item.label}
              </Text>
              <Text style={styles.itemStore} numberOfLines={1}>
                {item.store}
              </Text>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <Tap
              scale={0.88}
              hitSlop={HIT}
              style={styles.addButton}
              accessibilityRole="button"
              accessibilityLabel={`Add ${item.label} to basket`}
              onPress={() => onAdd(item.label)}>
              <Text style={styles.addGlyph}>+</Text>
            </Tap>
          </View>
        ))}
      </View>
    </View>
  );
}

export function OrderCards({ onReorder }: { onReorder: (order: Order) => void }) {
  return (
    <View style={styles.orderList}>
      {pastOrders.orders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Initials text={order.initials} size={44} background={Colors.greenDark} />
            <View style={styles.orderBody}>
              <Text style={styles.orderStore} numberOfLines={1}>
                {order.store}
              </Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <Text style={styles.orderTotal}>{order.total}</Text>
          </View>

          <Text style={styles.orderItems}>{order.items}</Text>

          <Tap
            scale={0.98}
            style={styles.reorder}
            accessibilityRole="button"
            accessibilityLabel={`Reorder from ${order.store}`}
            onPress={() => onReorder(order)}>
            <Text style={styles.reorderLabel}>Reorder</Text>
          </Tap>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    paddingHorizontal: 17,
    paddingVertical: 15,
    boxShadow: Shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardEyebrow: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    letterSpacing: 0.66,
    color: Colors.eyebrow,
  },
  cardTotal: {
    fontFamily: Fonts.extrabold,
    fontSize: 13,
    color: Colors.ink,
  },
  itemList: {
    gap: 11,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  itemThumb: {
    width: 42,
    height: 42,
    borderRadius: 11,
  },
  itemBody: {
    flex: 1,
  },
  itemLabel: {
    fontFamily: Fonts.bold,
    fontSize: 13.5,
    color: Colors.ink,
  },
  itemStore: {
    fontFamily: Fonts.semibold,
    fontSize: 11.5,
    color: Colors.muted,
    marginTop: 2,
  },
  itemPrice: {
    fontFamily: Fonts.extrabold,
    fontSize: 13.5,
    color: Colors.price,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addGlyph: {
    fontFamily: Fonts.regular,
    fontSize: 20,
    lineHeight: 24,
    color: Colors.surface,
  },
  orderList: {
    gap: 12,
  },
  orderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
    boxShadow: Shadows.card,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderBody: {
    flex: 1,
  },
  orderStore: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.nearBlack,
  },
  orderDate: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mutedTeal,
    marginTop: 2,
  },
  orderTotal: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.green,
  },
  orderItems: {
    fontFamily: Fonts.regular,
    fontSize: 12.5,
    lineHeight: 17.5,
    color: Colors.mutedTeal,
    marginTop: 10,
  },
  reorder: {
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  reorderLabel: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.surface,
  },
});
