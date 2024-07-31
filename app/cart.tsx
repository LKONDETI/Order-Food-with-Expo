import { View, Text, Button, FlatList, StyleSheet,ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { supabase } from '@/components/navigation/supabase';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CartScreen(){
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if (cart) {
        setCart(JSON.parse(cart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const completePurchase = async () => {
    const { data: purchaseData, error: purchaseError } = await supabase.from('purchases').insert({ items: cart }).select('id');
    if (purchaseError) {
      console.error(purchaseError);
    } else {
      const purchaseId = purchaseData[0].id;
      await AsyncStorage.removeItem('cart'); // Clear cart after purchase
      navigation.navigate('success', { purchaseId, items: cart });
    }
  };

  return (
    <ScrollView>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.contentLayout}>
            <Text style={styles.title}>{item.foods}</Text>
            <Text>{item.Description}</Text>
            <Text style={styles.price}>Price: {item.price}</Text>
          </View>
        )}
      />
      <Button title="Complete Purchase" onPress={completePurchase} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  contentLayout: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    
  },
  description: {
    fontSize: 16,
    
  },
});


