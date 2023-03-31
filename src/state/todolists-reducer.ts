import { v1 } from 'uuid'

import { TodolistType } from '../api/todolist-api'

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}
type StateType = Array<TodolistDomainType>
type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}
const initialState: StateType = []

export const todolistsReducer = (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      let newTodo: TodolistDomainType = {
        id: action.todolistId,
        title: action.title,
        filter: 'all',
        addedDate: '',
        order: 0,
      }

      return [...state, newTodo]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl))
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(tl => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))
    }
    default:
      return state
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  let todolistId = v1()

  return { type: 'ADD-TODOLIST', title, todolistId }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType =>
  ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title,
  } as const)
export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType =>
  ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter,
  } as const)
