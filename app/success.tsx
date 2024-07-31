import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SuccessScreen = () => {
  const route = useRoute();
  const { purchaseId, items } = route.params;

  return (
    <ScrollView>
      <Text style={styles.purchase}>Your order is conformed! This is the token number <Text style={styles.purchaseNumber}>{purchaseId}</Text></Text>
      <Text style={styles.purchase}>Your order details are:</Text>
     <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.contentLayout}>
            
            <Text style={styles.title}>{item.foods}</Text>
            <Text style={styles.price}>Price: {item.price}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    purchase:{
        margin:5,
        fontSize:15,

    },
    contentLayout: {
      
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    purchaseNumber: {
      fontSize: 20,
      margin: 5,
      fontWeight: 'bold', 
      justifyContent:'center',
      alignContent:'center' 
    },
    price: {
        fontSize: 15,
        paddingTop: 5
      },
  });
    

export default SuccessScreen;
