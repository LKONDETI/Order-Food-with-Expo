import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <Stack
    screenOptions={{ 
      headerRight: () => (
        <>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('cart')}
            style={{ marginRight: 10 }}
          >
            <FontAwesome
              name={'shopping-cart'}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          
        </>
      ),
    }}
  >
      
      <Stack.Screen name="index" />
      <Stack.Screen name="menu" />
      <Stack.Screen name="cart" />
    </Stack>
  );
}
