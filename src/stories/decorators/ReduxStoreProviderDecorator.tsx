import React from 'react'

import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'

import { TaskPriorities, TaskStatuses } from '../../api/todolist-api'
import { appReducer } from '../../app/app-reducer'
import { AppRootStateType } from '../../app/store'
import { tasksReducer } from '../../features/TodolistsList/TodoList/tasks-reducer'
import { todolistsReducer } from '../../features/TodolistsList/TodoList/todolists-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})
//@ts-ignore
const initialGlobalState: AppRootStateType = {
  todolists: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
    {
      id: 'todolistId2',
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 1,
      entityStatus: 'idle',
    },
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: 'todolistId1',
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: 'todolistId1',
      },
      {
        id: v1(),
        title: 'ReactJS',
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: 'todolistId1',
      },
      {
        id: v1(),
        title: 'NextJS',
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: 'todolistId1',
      },
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Rest API',
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: 'todolistId2',
      },
      {
        id: v1(),
        title: 'GraphQL',
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: 'todolistId2',
      },
    ],
  },
}

export const storyBookStore = createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
)
