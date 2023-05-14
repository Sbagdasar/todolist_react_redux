import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AuthActionsType, authReducer } from '../features/Login/auth-reducer'
import { TasksActionType, tasksReducer } from '../features/TodolistsList/TodoList/tasks-reducer'
import {
  TodolistsActionType,
  todolistsReducer,
} from '../features/TodolistsList/TodoList/todolists-reducer'

import { AppActionType, appReducer } from './app-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

type RootAppActions = TasksActionType | TodolistsActionType | AppActionType | AuthActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  RootAppActions
>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, RootAppActions>

//@ts-ignore
window.store = store
