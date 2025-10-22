import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const INVENTORY_SCREEN = 'Inventory'; // For navigation reference

const InventoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default InventoryScreen;
