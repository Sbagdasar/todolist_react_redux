import { v1 } from 'uuid'

import { TaskPriorities, TaskStatuses } from '../api/todolist-api'
import { TasksStateType } from '../App'

import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer'

type StateType = TasksStateType
type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskSTitleActionType
  | RemoveTodolistActionType
  | AddTodolistActionType

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  id: string
  todolistId: string
}
type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todolistId: string
}
type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  id: string
  todolistId: string
  status: TaskStatuses
}

type ChangeTaskSTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  id: string
  todolistId: string
  title: string
}
const initialState: StateType = {}

export const tasksReducer = (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id),
      }
    }
    case 'ADD-TASK': {
      return {
        ...state,
        [action.todolistId]: [
          {
            id: v1(),
            title: action.title,
            status: TaskStatuses.Completed,
            order: 0,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: '',
            priority: TaskPriorities.Middle,
            todoListId: action.todolistId,
          },
          ...state[action.todolistId],
        ],
      }
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t =>
          t.id === action.id
            ? {
                ...t,
                isDone: action.status,
              }
            : t
        ),
      }
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t =>
          t.id === action.id
            ? {
                ...t,
                title: action.title,
              }
            : t
        ),
      }
    }
    case 'REMOVE-TODOLIST': {
      delete state[action.id]

      return { ...state }
    }
    case 'ADD-TODOLIST': {
      return { ...state, [action.todolistId]: [] }
    }
    default:
      return state
  }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', id, todolistId }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return { type: 'ADD-TASK', title, todolistId }
}
export const changeTaskStatusAC = (
  id: string,
  status: TaskStatuses,
  todolistId: string
): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', id, status, todolistId }
}
export const changeTaskTitleAC = (
  id: string,
  title: string,
  todolistId: string
): ChangeTaskSTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', id, title, todolistId }
}
