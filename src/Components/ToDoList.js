import React, {useEffect, useState} from 'react';
import {useQuery, useMutation, gql} from '@apollo/client';
import {CREATE_TASK_MUTATION, DELETE, UPDATE} from '../GraphQL/Mutations';
import {LOAD_LIST_OF_TASK} from '../GraphQL/Queries';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Tasks from './Tasks';
const COLORS = {primary: '#4682b4', white: '#fff'};

function ToDoList() {
  const {error, loading, data} = useQuery(LOAD_LIST_OF_TASK);
  const [
    addTaskTodoList,
    {dataTask, loadingTask, errorTask},
  ] = useMutation(CREATE_TASK_MUTATION, {
    errorPolicy: 'all',
    refetchQueries: [{query: LOAD_LIST_OF_TASK}],
  });

  const [list, setList] = useState([]);
  useEffect(() => {
    if (data) {
      setList(data.getAllToDoTask);
    }
  }, [data]);

  const [taskValue, setTask] = useState('');
  const addTask = () => {
    addTaskTodoList({
      variables: {
        todotask: taskValue,
        done: false,
      },
    });
    if(errorTask)
    {
      console.log(errorTask)
    }
  };

  return (
    <View>
      <View style={styles.addContainer}>
        <View style={styles.addInputContainer}>
          <TextInput
            placeholder="Add Todo"
            onChangeText={text => {
              setTask(text);
            }}
          />
        </View>
        <TouchableOpacity onPress={addTask}>
          <View style={styles.iconContainer}>
            <Icon name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <Tasks list={list} />
    </View>
  );
}

const styles = StyleSheet.create({
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 3,
  },
  addInputContainer: {
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    width: 50,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ToDoList;
