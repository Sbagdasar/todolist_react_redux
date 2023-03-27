import React, { useEffect, useState } from 'react'

import axios from 'axios'

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
    axios
      .get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    axios
      .post(
        'https://social-network.samuraijs.com/api/1.1/todo-lists',
        { title: 'NEW TITLE!!!!!' },
        settings
      )
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    axios
      .delete(
        'https://social-network.samuraijs.com/api/1.1/todo-lists/59b54035-bd0b-4afb-88f1-afe181ee7764',
        settings
      )
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    axios
      .put(
        'https://social-network.samuraijs.com/api/1.1/todo-lists/42d33842-c964-4736-b0bd-92a1da246158',
        { title: 'NEW TITLE!!!!!' },
        settings
      )
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
