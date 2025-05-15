import { ThemedText, ThemedView } from '@/components/Themed';
import { StyleSheet } from 'react-native';

export default function OrdersScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Order History</ThemedText>
      {/* Add order history content */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
