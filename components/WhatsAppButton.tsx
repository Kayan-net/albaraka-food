import { generateAndShareInvoice } from '@/utils/generateInvoice';
import { MaterialIcons } from '@expo/vector-icons';
import { Linking, TouchableOpacity } from 'react-native';
import { ThemedText } from './Themed';

export function WhatsAppButton({ orderDetails, total }: { orderDetails: string, total: number }) {
  const handleOrder = async () => {
    try {
      // Generate invoice first
      await generateAndShareInvoice(orderDetails, total);
      
      // Then send WhatsApp message
      const phone = '+27123456789';
      const message = `New Order:\n${orderDetails}\n\nTotal: R${total.toFixed(2)}`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      
      Linking.openURL(url);
    } catch (error) {
      alert('Error processing order');
    }
  };

  return (
    <TouchableOpacity
      className="bg-green-600 p-4 rounded-lg flex-row items-center"
      onPress={handleOrder}>
      <MaterialIcons name="whatshot" size={24} color="white" />
      <ThemedText className="text-white ml-2">Order via WhatsApp</ThemedText>
    </TouchableOpacity>
  );
} 