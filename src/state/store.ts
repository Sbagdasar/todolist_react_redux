import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { TasksActionType, tasksReducer } from './tasks-reducer'
import { TodolistsActionType, todolistsReducer } from './todolists-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

type RootAppActions = TasksActionType | TodolistsActionType

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  RootAppActions
>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, RootAppActions>

//@ts-ignore
window.store = store
