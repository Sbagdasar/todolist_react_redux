import { AxiosError } from 'axios'

import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from '../../../api/todolist-api'
import { TasksStateType } from '../../../app/App'
import { setAppStatusAC } from '../../../app/app-reducer'
import { AppThunkType } from '../../../app/store'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils'

import {
  CreateTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsACType,
} from './todolists-reducer'

const initialState: StateType = {}

export const tasksReducer = (state: StateType = initialState, action: TasksActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id),
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t =>
          t.id === action.taskId ? { ...t, ...action.model } : t
        ),
      }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t =>
          t.id === action.id ? { ...t, title: action.title } : t
        ),
      }
    case 'REMOVE-TODOLIST': {
      let copyState = { ...state }

      delete copyState[action.id]

      return copyState
    }
    case 'ADD-TODOLIST':
      return { ...state, [action.todolist.id]: [] }
    case 'SET-TODOLISTS': {
      const newState = { ...state }

      action.todolists.forEach(tl => (newState[tl.id] = []))

      return newState
    }
    case 'SET-TASKS':
      return { ...state, [action.todolistId]: action.tasks }
    default:
      return state
  }
}

// actions
export const removeTaskAC = (id: string, todolistId: string) =>
  ({ type: 'REMOVE-TASK', id, todolistId } as const)
export const createTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
) => ({ type: 'UPDATE-TASK', taskId, todoListId: todolistId, model } as const)
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) =>
  ({ type: 'CHANGE-TASK-TITLE', id, title, todolistId } as const)
const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
  ({
    type: 'SET-TASKS',
    todolistId,
    tasks,
  } as const)

//thunks
export const setTasksTC =
  (todolistId: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await todolistAPI.getTasks(todolistId)

      dispatch(setTasksAC(todolistId, res.data.items))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerNetworkError(e as Error, dispatch)
    }
  }
export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await todolistAPI.deleteTask(todolistId, taskId)

      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(taskId, todolistId))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      handleServerNetworkError(e as Error, dispatch)
    }
  }
export const createTaskTC =
  (todolistId: string, title: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await todolistAPI.createTask(todolistId, title)

      if (res.data.resultCode === 0) {
        const task = res.data.data.item

        dispatch(createTaskAC(task))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      handleServerNetworkError(e as Error, dispatch)
    }
  }
export const updateTaskTC =
  (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunkType =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))

    const task = getState().tasks[todoListId].find(t => t.id === taskId)

    if (!task) return
    const apiModel: UpdateTaskModelType = {
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      title: task.title,
      priority: task.priority,
      description: task.description,
      ...domainModel,
    }

    try {
      const res = await todolistAPI.updateTask(todoListId, taskId, apiModel)

      if (res.data.resultCode === 0) {
        dispatch(updateTaskAC(todoListId, taskId, domainModel))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      handleServerNetworkError(e as Error, dispatch)
    }
  }

//type
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string | null
  deadline?: string | null
}
type StateType = TasksStateType
export type TasksActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof createTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof changeTaskTitleAC>
  | RemoveTodolistActionType
  | CreateTodolistActionType
  | SetTodolistsACType
  | ReturnType<typeof setTasksAC>
