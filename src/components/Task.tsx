import React, { ChangeEvent, useCallback } from 'react'

import { Delete } from '@mui/icons-material'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'

import { TaskStatuses, TaskType } from '../api/todolist-api'

import { EditableSpan } from './EditableSpan/EditableSpan'

type TaskPropsType = {
  task: TaskType
  todolistId: string
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}
export const Task = (props: TaskPropsType) => {
  const removeTaskHandler = () => {
    props.removeTask(props.todolistId, props.task.id)
  }
  const changeTaskStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(
        props.todolistId,
        props.task.id,
        e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
      )
    },
    [props.todolistId, props.task.id, props.changeTaskStatus]
  )
  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      props.changeTaskTitle(props.todolistId, props.task.id, title)
    },
    [props.changeTaskTitle, props.todolistId, props.task.id]
  )

  return (
    <div
      key={props.task.id}
      className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
    >
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color={'primary'}
        onChange={changeTaskStatusHandler}
      />
      <EditableSpan value={props.task.title} onchange={changeTaskTitleHandler} />

      <IconButton onClick={removeTaskHandler} size={'small'}>
        <Delete />
      </IconButton>
    </div>
  )
}
