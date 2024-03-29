import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { TaskType, todolistAPI, UpdateTaskModelType } from '../api/todolist-api'

export default {
  title: 'API',
}
let settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '1abf02da-1f01-4a57-9e95-d7c2e3ba6948',
  },
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistAPI.getTodolists().then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistAPI.createTodolist('New Title').then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    let id = '0d350e0b-15e7-4511-8a23-316efd253d21'

    todolistAPI.deleteTodolist(id).then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    let id = 'b2425491-b108-47e8-a779-cc6e92db9bc2'

    todolistAPI.updateTodolist(id, 'NEW TITLE ').then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

//tasks

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    let todolisId = '42d33842-c964-4736-b0bd-92a1da246158'

    todolistAPI.getTasks(todolisId).then(res => setState(res.data.items))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    let todolisId = '42d33842-c964-4736-b0bd-92a1da246158'

    todolistAPI.createTask(todolisId, 'New task').then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    let todolisId = '42d33842-c964-4736-b0bd-92a1da246158'
    let taskId = '3dafa04f-5486-48f2-a1ad-3cd33194b3ea'

    todolistAPI.deleteTask(todolisId, taskId).then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    let todolisId = '42d33842-c964-4736-b0bd-92a1da246158'
    let taskId = '4f73eb79-f144-475c-9623-5981daf72f9a'
    let model: UpdateTaskModelType = {
      deadline: '',
      startDate: '',
      description: '123123123',
      priority: 1,
      status: 0,
      title: 'QQQQQQQQQQQQ',
    }

    todolistAPI.updateTask(todolisId, taskId, model).then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
