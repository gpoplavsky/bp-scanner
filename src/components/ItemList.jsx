import { StyleSheet, FlatList, View } from 'react-native'
import React from 'react'
import Item from './Item';

const ItemList = ({ items }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.timestamp}
        renderItem={({item, index}) => (
          <Item id={index + 1} date={item.timestamp} data={item.data} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ItemList;