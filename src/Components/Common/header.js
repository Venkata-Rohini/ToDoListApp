import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const header = function() {
  let today = new Date().toISOString().slice(0, 10);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>To Do List</Text>
      <Text style={styles.text}>{today}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical:60,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#ffffff",
    marginRight: 20,
  },
});
export default header;
