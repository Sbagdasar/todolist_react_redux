import { v1 } from 'uuid'

import { TodolistType } from '../../../api/todolist-api'

import {
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  FilterValuesType,
  removeTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from './todolists-reducer'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: 'all',
      order: 0,
      addedDate: '',
      entityStatus: 'idle',
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      order: 0,
      addedDate: '',
      entityStatus: 'idle',
    },
  ]
})
test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let newTodolistTitle = 'New Todolist'
  let todo: TodolistType = {
    title: newTodolistTitle,
    id: '123213',
    addedDate: '',
    order: 0,
  }
  const endState = todolistsReducer(startState, createTodolistAC(todo))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'

  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC(todolistId2, newTodolistTitle)
  )

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed'

  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})
test('change todolist entity status', () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistEntityStatusAC(todolistId2, 'loading')
  )

  expect(endState[0].entityStatus).toBe('idle')
  expect(endState[1].entityStatus).toBe('loading')
})
