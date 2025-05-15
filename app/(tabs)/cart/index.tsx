import { ThemedText, ThemedView } from '@/components/Themed';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { useCart } from '@/contexts/CartContext';
import { getOpeningStatus, isRestaurantOpen } from '@/utils/timeCheck';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function CartScreen() {
  const { cart, clearCart } = useCart();
  const isOpen = isRestaurantOpen();

  const orderDetails = cart.items
    .map(item => `${item.quantity}x ${item.name} - R${(item.quantity * item.price).toFixed(2)}`)
    .join('\n');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.title}>Your Order</ThemedText>
      
      {cart.items.map(item => (
        <ThemedView key={item.id} style={styles.item}>
          <ThemedText style={styles.itemName}>{item.name}</ThemedText>
          <ThemedText style={styles.itemPrice}>
            {item.quantity} x R{item.price.toFixed(2)}
          </ThemedText>
        </ThemedView>
      ))}

      <ThemedView style={styles.totalContainer}>
        <ThemedText style={styles.totalText}>
          Total: R{cart.total.toFixed(2)}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.orderOptions}>
        <ThemedText style={styles.sectionTitle}>Order Type:</ThemedText>
        <ThemedView style={styles.optionRow}>
          <ThemedText style={styles.optionText}>Dine-in</ThemedText>
          <ThemedText style={styles.optionText}>Takeaway</ThemedText>
        </ThemedView>

        {isOpen ? (
          <>
            <WhatsAppButton 
              orderDetails={`${orderDetails}\n\nTotal: R${cart.total.toFixed(2)}`}
              total={cart.total}
            />
            <ThemedText style={styles.note}>
              {getOpeningStatus()}
            </ThemedText>
          </>
        ) : (
          <ThemedText style={styles.closedMessage}>
            {getOpeningStatus()}
          </ThemedText>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemName: {
    fontSize: 16,
    flex: 2,
  },
  itemPrice: {
    fontSize: 16,
    color: '#e67e22',
    flex: 1,
    textAlign: 'right',
  },
  totalContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#e67e22',
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderOptions: {
    marginTop: 30,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 16,
    color: '#666',
  },
  note: {
    marginTop: 15,
    color: '#666',
    textAlign: 'center',
  },
  closedMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  }
});
