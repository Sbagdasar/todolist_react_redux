import { TaskPriorities, TaskStatuses, TaskType, TodolistType } from '../api/todolist-api'
import { TasksStateType } from '../trash/App'

import {
  changeTaskTitleAC,
  createTaskAC,
  removeTaskAC,
  tasksReducer,
  updateTaskAC,
} from './tasks-reducer'
import { createTodolistAC, removeTodolistAC } from './todolists-reducer'

let startState: TasksStateType

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
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
        id: '2',
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
        id: '3',
        title: 'React',
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
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: 'todolistId2',
      },
      {
        id: '2',
        title: 'milk',
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
        id: '3',
        title: 'tea',
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
  }
})

test('correct task should be deleted from correct array', () => {
  const action = removeTaskAC('2', 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
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
        id: '2',
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
        id: '3',
        title: 'React',
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
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: 'todolistId2',
      },
      {
        id: '3',
        title: 'tea',
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
  })
})

test('correct task should be added to correct array', () => {
  let task: TaskType = {
    todoListId: 'todolistId2',
    title: 'juce',
    status: TaskStatuses.New,
    order: 0,
    addedDate: '',
    startDate: '',
    priority: TaskPriorities.Middle,
    description: '',
    deadline: '',
    id: '123',
  }
  const action = createTaskAC(task)

  const endState = tasksReducer(startState, action)

  debugger
  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const action = updateTaskAC('todolistId2', '2', { status: TaskStatuses.New })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})
test('title of specified task should be changed', () => {
  const action = changeTaskTitleAC('2', 'NewTitle', 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId2'][1].title).toBe('NewTitle')
})

test('new array should be added when new todolist is added', () => {
  let todo: TodolistType = {
    title: 'new todolist',
    id: '123213',
    addedDate: '',
    order: 0,
  }
  const action = createTodolistAC(todo)

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')

  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const action = removeTodolistAC('todolistId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
