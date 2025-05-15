
import { ThemedText, ThemedView } from '@/components/Themed';
import { StyleSheet } from 'react-native';

export default function profileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      {/* Add profile content */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: 'blue',
  }
});
