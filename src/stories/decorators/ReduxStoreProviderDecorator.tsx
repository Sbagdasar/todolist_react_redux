import React from 'react'

import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'

import { TaskPriorities, TaskStatuses } from '../../api/todolist-api'
import { AppRootStateType } from '../../state/store'
import { tasksReducer } from '../../state/tasks-reducer'
import { todolistsReducer } from '../../state/todolists-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

const initialGlobalState: AppRootStateType = {
  // @ts-ignore
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 1 },
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
