import { Text, View } from 'react-native';

export const ThemedText = ({ className, ...props }: Text['props']) => {
  return <Text className={className} {...props} />;
};

export const ThemedView = ({ className, ...props }: View['props']) => {
  return <View className={className} {...props} />;
};