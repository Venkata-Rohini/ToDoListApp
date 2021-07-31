import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import ToDoList from './src/Components/ToDoList';
import Header from './src/Components/Common/header';

const client = new ApolloClient({
  uri: 'https://todolistpoc.herokuapp.com/taskGQL',
  cache: new InMemoryCache(),
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4682b4" />
        <View style={{display:"flex",flexDirection:"column"}}>
          <Header />
          <ToDoList />
        </View>
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical:50,
    backgroundColor: '#4682b4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
