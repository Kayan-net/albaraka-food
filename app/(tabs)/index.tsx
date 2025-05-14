import { ThemedText, ThemedView } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <ThemedText className="text-2xl font-bold text-orange-700">Al Barakah</ThemedText>
          <Ionicons name="restaurant" size={28} color="#D97706" />
        </View>

        {/* Welcome Banner */}
        <View className="mb-4">
          <Image
            source={{ uri: 'https://source.unsplash.com/600x300/?restaurant,food' }}
            className="w-full h-48 rounded-2xl"
            resizeMode="cover"
          />
          <ThemedText className="mt-2 text-lg text-gray-600">
            Dine-In & Takeaway • 7:00 AM – 10:00 PM
          </ThemedText>
        </View>

        {/* Categories */}
        <ThemedText className="text-xl font-semibold mb-2">Categories</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3">
          {['Biryani', 'Mixed Grill', 'Chinese', 'Vegetarian', 'Specials'].map((cat) => (
            <Link
              key={cat}
              href={`/menu?category=${cat}`}
              className="bg-orange-100 px-4 py-2 rounded-xl border border-orange-300"
            >
              <ThemedText className="text-orange-700 font-medium">{cat}</ThemedText>
            </Link>
          ))}
        </ScrollView>

        {/* Promotions */}
        <ThemedText className="text-xl font-semibold mt-6 mb-2">Today’s Specials</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-4">
          {[1, 2].map((item) => (
            <ThemedView
              key={item}
              className="w-60 bg-orange-50 rounded-2xl p-3 shadow-md"
            >
              <Image
                source={{ uri: 'https://source.unsplash.com/300x200/?indian-food' }}
                className="w-full h-28 rounded-xl"
              />
              <ThemedText className="mt-2 font-bold text-lg text-orange-800">
                Chicken Tikka Biryani
              </ThemedText>
              <ThemedText className="text-gray-600">Spicy & flavorful with raita</ThemedText>
              <ThemedText className="mt-1 text-orange-700 font-semibold">R89.99</ThemedText>
            </ThemedView>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}