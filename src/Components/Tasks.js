import React, {useState} from 'react';
import {CREATE_TASK_MUTATION,DELETE, UPDATE} from '../GraphQL/Mutations';
import {LOAD_LIST_OF_TASK} from '../GraphQL/Queries';
import {useMutation} from '@apollo/client';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const COLORS = {primary: '#4682b4', white: '#fff'};


function EachTask(todo) {
  let task = todo.item.item;
  const [deleteTaskById, { dataDeleteTask, loadingDeleteTask, errorDeleteTask }] = useMutation(DELETE, { errorPolicy: 'all'  ,refetchQueries: [{ query: LOAD_LIST_OF_TASK }]});
  const [updateTaskById, { dataUpdateTask, loadingUpdateTask, errorUpdateTask }] = useMutation(UPDATE, { errorPolicy: 'all' ,refetchQueries: [{ query: LOAD_LIST_OF_TASK }]});
  const deleteTask = (id) => {
    deleteTaskById({
       variables: {id: id}
     });
   };

const updateTask = (task) => {
  updateTaskById({
     variables:{  
      id: task.id,
      todotask: task.todotask,
        done: !task.done
    }
   });
 };

  return (
    <View style={styles.listItem}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: COLORS.primary,
            textDecorationLine: task.done ? 'line-through' : 'none',
          }}>
          {task.todotask}
        </Text> 
      </View>
     
        <TouchableOpacity onPress={() => updateTask(task)}>
          <View style={[styles.actionIcon, {backgroundColor: COLORS.primary}]}>
            <Icon name= {task.done?"radio-button-on":"radio-button-off"} size={20} color={COLORS.white} />
          </View>
        </TouchableOpacity>
    
      <TouchableOpacity onPress={() => deleteTask(task.id,task.description)}>
        <View style={[styles.actionIcon, {backgroundColor:COLORS.primary}]}>
          <Icon name="delete" size={20} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

function Tasks(list) {
  const tasks = list.list;
   if (tasks.length > 0) {
     return (
       <SafeAreaView style={{flex: 1}}>
         <FlatList
         showsVerticalScrollIndicator={true}
           data={tasks}
           keyExtractor={item => item.id}
           renderItem={task => <EachTask item={task} />}
         />
       </SafeAreaView>
     );
   } else {
     return (
       <ActivityIndicator
         animating={true}
         color={COLORS.white}
         size="large"
         style={{
           flex: 1,
           justifyContent: 'center',
           alignItems: 'center',
         }}
       />
     );
   }
 }
const styles = StyleSheet.create({
    listItem: {
      padding: 20,
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      elevation: 12,
      borderRadius: 7,
      marginVertical: 10,
      justifyContent: 'space-evenly',
    },
    actionIcon: {
      height: 25,
      width: 25,
      backgroundColor: COLORS.white,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      marginLeft: 5,
      borderRadius: 3,
    }
  });

export default Tasks;