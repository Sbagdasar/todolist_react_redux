import { todolistAPI, TodolistType } from '../../../api/todolist-api'
import { AppThunkType } from '../../../app/store'

const initialState: StateType = []

export const todolistsReducer = (state: StateType = initialState, action: TodolistsActionType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{ ...action.todolist, filter: 'all' }, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl))
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))
    case 'SET-TODOLISTS':
      return action.todolists.map(tl => ({
        ...tl,
        filter: 'all',
      }))
    default:
      return state
  }
}

//actions
export const removeTodolistAC = (id: string) => ({ type: 'REMOVE-TODOLIST', id } as const)
export const createTodolistAC = (todolist: TodolistType) =>
  ({ type: 'ADD-TODOLIST', todolist } as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title,
  } as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
  ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter,
  } as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({ type: 'SET-TODOLISTS', todolists } as const)

//thunks
export const getTodolistsTC = (): AppThunkType => async dispatch => {
  const res = await todolistAPI.getTodolists()

  dispatch(setTodolistsAC(res.data))
}
export const removeTodoListTC =
  (todoListId: string): AppThunkType =>
  async dispatch => {
    const res = await todolistAPI.deleteTodolist(todoListId)

    dispatch(removeTodolistAC(todoListId))
  }
export const changeTodolistTitleTC =
  (todoListId: string, title: string): AppThunkType =>
  async dispatch => {
    const res = todolistAPI.updateTodolist(todoListId, title)

    dispatch(changeTodolistTitleAC(todoListId, title))
  }
export const createTodoListTC =
  (title: string): AppThunkType =>
  async dispatch => {
    const res = await todolistAPI.createTodolist(title)

    dispatch(createTodolistAC(res.data.data.item))
  }

// types
export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
type StateType = Array<TodolistDomainType>
export type TodolistsActionType =
  | SetTodolistsACType
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | CreateTodolistActionType
  | RemoveTodolistActionType
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
