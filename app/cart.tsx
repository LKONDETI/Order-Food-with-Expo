import React from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { useCart } from './CartContent';    

const CartScreen = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <ScrollView>
      <Text>Cart Items:</Text>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <View key={index}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}</Text>
            <Button
              title="Remove from Cart"
              onPress={() => removeFromCart(item.id)}
              color="red"
            />
          </View>
        ))
      ) : (
        <Text>No items in the cart.</Text>
      )}
    </ScrollView>
  );
};

export default CartScreen;
