import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet ,ScrollView, Button, TouchableOpacity } from "react-native";
import { supabase } from "@/components/navigation/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";


export default function DisplayFoodTypes(){
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data: foods, error } = await supabase
          .from('FoodTypes')
          .select('*');
        if (error) {
          throw error;
        }
        setFoods(foods);
      } catch (error: any) {
        console.error('Error fetching food types:', error.message);
      }
      setLoading(false);
    };

    fetchPartners();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <ScrollView style={styles.container}>
      
    <View>      
    
      <View style={styles.subContainer}>
        {foods.map(food => (
          <View key={food.id} style={styles.Card}>
            <Text style={styles.Name}>{food.name}</Text>
            <Text style={styles.Desc}>{food.description}</Text>
            <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate('menu', { FoodId: food.id })} >
              <FontAwesome
                name={'arrow-right'}
                color="black"
                style={styles.ButtonSize}
              />
              </TouchableOpacity>
                
                
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  Card: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    
    width: 300
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
  Button:{
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey'
  },
  ButtonSize: {
    fontSize: 20,
  }
  
});