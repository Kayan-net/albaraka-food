import { ThemedText, ThemedView } from '@/components/Themed';
import { menuData } from '@/constants/menu';
import { useCart } from '@/contexts/CartContext';
import { useLocalSearchParams } from 'expo-router';
import { Button, Image, SectionList, StyleSheet } from 'react-native';

export default function MenuScreen() {
  const { category } = useLocalSearchParams();
  const { addItem } = useCart();

  // Filter menu data based on category
  const filteredData = category 
    ? menuData.filter(section => 
        section.title.toLowerCase() === (category as string).toLowerCase()
      )
    : menuData;

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
    });
  };

  if (filteredData.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.emptyText}>
          No items found in this category
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SectionList
        sections={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.itemContainer}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.itemImage}
            />
            <ThemedView style={styles.itemDetails}>
              <ThemedText style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
              <ThemedText style={styles.itemPrice}>R{item.price}</ThemedText>
            </ThemedView>
            <Button
              title="Add"
              onPress={() => handleAddToCart(item)}
              color="#e67e22"
            />
          </ThemedView>
        )}
        renderSectionHeader={({ section }) => (
          <ThemedText style={styles.sectionHeader}>
            {section.title}
          </ThemedText>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    color: '#e67e22',
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f8f9fa',
    padding: 12,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});