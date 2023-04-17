import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '1abf02da-1f01-4a57-9e95-d7c2e3ba6948',
  },
})

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists')
  },
  createTodolist(title: string) {
    //3 param in generic for types param of function
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TodolistType }>>,
      { title: string }
    >('todo-lists', { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<{}, AxiosResponse<ResponseType>>(`todo-lists/${id}`)
  },
  updateTodolist(id: string, title: string) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {
      title,
    })
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    )
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    )
  },
}

//types
export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors?: Array<string>
  data: D
}
export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}
type GetTasksResponseType = {
  items: Array<TaskType>
  totalCount: number
  error: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
}
