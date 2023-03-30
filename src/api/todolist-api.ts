import axios from 'axios'

import { CreateTodolist, UpdateTodolistTitle } from '../stories/todolists-api.stories'
let instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '1abf02da-1f01-4a57-9e95-d7c2e3ba6948',
  },
})
let settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '1abf02da-1f01-4a57-9e95-d7c2e3ba6948',
  },
}

export const todolistAPI = {
  getTodolists() {
    return instance.get('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post('todo-lists', { title })
  },
  deleteTodolist(id: string) {
    return instance.delete(`todo-lists/${id}`)
  },
  updateTodolist(id: string, title: string) {
    return instance.put(`todo-lists/${id}`, { title })
  },
}
