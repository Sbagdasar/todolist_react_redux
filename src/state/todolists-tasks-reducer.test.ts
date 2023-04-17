import { TodolistType } from '../api/todolist-api'
import { TasksStateType } from '../trash/App'

import { tasksReducer } from './tasks-reducer'
import { createTodolistAC, TodolistDomainType, todolistsReducer } from './todolists-reducer'

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []
  let todo: TodolistType = {
    title: 'new todolist',
    id: '123213',
    addedDate: '',
    order: 0,
  }
  const action = createTodolistAC(todo)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolist.id)
  expect(idFromTodolists).toBe(action.todolist.id)
})
