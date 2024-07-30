import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, VirtualizedList } from 'react-native';
import { supabase } from '@/components/navigation/supabase';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from './CartContent';

export default function FoodItems() {
    const [items, setItems] = useState([]);
    const route = useRoute();
    const { FoodId } = route.params;

    // const { addToCart } = useCart();

    const fetchItems = async () => {
        const { data, error } = await supabase
        .from('Menu')
        .select('*')
        .eq('food_no', FoodId);

        if (error) {
        console.error(error);
        return null;
        } else {
        return data;
        }
    };

    useEffect(() => {
        const getItems = async () => {
        if (FoodId) {
            const fetchedItems = await fetchItems();
            if (fetchedItems) {
            setItems(fetchedItems);
            }
        }
        };

        getItems();
    }, [FoodId]);

    const fetchItemDetails = async () => {
        const fetchedItems = await fetchItems();
        if (fetchedItems) {
        setItems(fetchedItems);
        } else {
        console.error('Failed to fetch item details');
        }
    };

  return (
    <ScrollView style={styles.container}>
        
        <TouchableOpacity 
        style={styles.Button}
        onPress={fetchItemDetails}>
            <FontAwesome
            name={'rotate-right'}
            color="black"
            style={styles.ButtonSize}
            />
            </TouchableOpacity>
        

      <View>
      {items.length > 0 ? (
        items.map((item, index) => (
          <View key={index} style={styles.Card}>
            <Text style={styles.Name}>{item.foods}</Text>
            <Text style={styles.Desc}>{item.Description}</Text>
            <Text style={styles.PriceDesc}>Price:{item.price}</Text>
            {/* <Button
              title="Add to Cart"
              onPress={() => addToCart(item)}
              color="green"
            /> */}
          </View>
        ))
      ) : (
        <Text>No food items found.</Text>
      )} 
      </View>
      
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  Card: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    
    width: 300
  },
  subContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  Name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Desc: {
    fontSize: 14,
    marginBottom: 5,
  },
  PriceDesc: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  Button:{
    padding: 2,
    display: 'flex',
    alignItems:'flex-end',
    justifyContent: 'flex-end',
        
  },
  ButtonSize: {
    fontSize: 20,
    display: 'flex',
    alignContent:'flex-end',
  }
});