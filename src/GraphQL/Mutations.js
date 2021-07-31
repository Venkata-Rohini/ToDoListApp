import { gql } from "@apollo/client";

export const CREATE_TASK_MUTATION = gql`
  mutation addTaskTodoList(
    $todotask: String
    $done: Boolean
  ) {
    createTask(task:{
      todotask: $todotask
      done: $done
    })
      {
        id
        todotask
        done
    }
  }
`
export const DELETE = gql`
  mutation deleteTaskById($id: String){
    deleteTask(id: $id)
  }
`   

export const UPDATE = gql`
  mutation updateTaskById(
    $id:String
    $todotask: String
    $done: Boolean
  ) {
    updateTask(
      id:$id
      task:{
        todotask: $todotask
        done: $done
      }
    ) {
        id
        todotask
        done
    }
  }
`
; 

