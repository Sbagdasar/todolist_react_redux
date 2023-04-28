import { todolistAPI, TodolistType } from '../../../api/todolist-api'
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from '../../../app/app-reducer'
import { AppThunkType } from '../../../app/store'

const initialState: StateType = []

export const todolistsReducer = (
  state: StateType = initialState,
  action: TodolistsActionType
): StateType => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl))
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))
    case 'SET-TODOLISTS':
      return action.todolists.map(tl => ({
        ...tl,
        filter: 'all',
        entityStatus: 'idle',
      }))
    case 'CHANGE-TODOLIST-ENTITY-STATUS': {
      return state.map(tl => (tl.id === action.id ? { ...tl, entityStatus: action.status } : tl))
    }
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
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
  ({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status } as const)

//thunks
export const getTodolistsTC = (): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  const res = await todolistAPI.getTodolists()

  dispatch(setTodolistsAC(res.data))
  dispatch(setAppStatusAC('succeeded'))
}
export const removeTodoListTC =
  (todoListId: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoListId, 'loading'))
    const res = await todolistAPI.deleteTodolist(todoListId)

    dispatch(removeTodolistAC(todoListId))
    dispatch(changeTodolistEntityStatusAC(todoListId, 'succeeded'))

    dispatch(setAppStatusAC('succeeded'))
  }
export const changeTodolistTitleTC =
  (todoListId: string, title: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))

    const res = todolistAPI.updateTodolist(todoListId, title)

    dispatch(changeTodolistTitleAC(todoListId, title))
    dispatch(setAppStatusAC('succeeded'))
  }
export const createTodoListTC =
  (title: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))

    const res = await todolistAPI.createTodolist(title)

    if (res.data.resultCode === 0) {
      dispatch(createTodolistAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      if (res.data.messages.length) {
        dispatch(setAppErrorAC(res.data.messages[0]))
      } else {
        dispatch(setAppErrorAC('Some error occurred'))
      }
      dispatch(setAppStatusAC('failed'))
    }
  }

// types
export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
type StateType = Array<TodolistDomainType>
export type TodolistsActionType =
  | SetTodolistsACType
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | CreateTodolistActionType
  | RemoveTodolistActionType
  | ReturnType<typeof changeTodolistEntityStatusAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
