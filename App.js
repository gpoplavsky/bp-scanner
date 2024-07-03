import React from 'react';
import { StyleSheet, View } from 'react-native';
import ItemListContainer from './src/components/ItemListContainer';

export default function App() {
  return (
    <View style={styles.container}>
      <ItemListContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
