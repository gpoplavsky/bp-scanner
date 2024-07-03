import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Item = ({id, date, data}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>ID: {id}</Text>
      <Text style={styles.date}>Fecha: {date} </Text>
      <Text style={styles.text}>Código: {data} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  data: {
    fontSize: 14,
  }
});

export default Item

