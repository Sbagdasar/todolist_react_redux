import axios from 'axios'

let instance = axios.create({
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
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },
  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title })
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<
      ResponseType<{
        item: TaskType
      }>
    >(`todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
}

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors?: Array<string>
  data: D
}

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

type TaskType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
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
