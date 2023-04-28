import React, { memo, useCallback, useEffect } from 'react'

import { Delete } from '@mui/icons-material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import { TaskStatuses, TaskType } from '../../../api/todolist-api'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { useAppDispatch } from '../../../hooks/appHooks'

import { Task } from './Task/Task'
import { setTasksTC } from './tasks-reducer'
import { FilterValuesType } from './todolists-reducer'

export type TodolistPropsType = {
  id: string
  title: string
  tasks: TaskType[]
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (id: string, filter: FilterValuesType) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  filter: FilterValuesType
}
export const Todolist = memo((props: TodolistPropsType) => {
  let dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setTasksTC(props.id))
  }, [])

  const addTaskHandler = useCallback(
    (title: string) => {
      props.addTask(props.id, title)
    },
    [props.addTask, props.id]
  )
  const removeTodolistHandler = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitleHandler = (title: string) => {
    props.changeTodolistTitle(props.id, title)
  }

  const allFilterHandler = useCallback(() => {
    props.changeFilter(props.id, 'all')
  }, [props.changeFilter, props.id])
  const activeFilterHandler = useCallback(() => {
    props.changeFilter(props.id, 'active')
  }, [props.changeFilter, props.id])
  const completedFilterHandler = useCallback(() => {
    props.changeFilter(props.id, 'completed')
  }, [props.changeFilter, props.id])

  let tasksForTodolist = props.tasks

  if (props.filter === 'active') {
    tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
  } else if (props.filter === 'completed') {
    tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <div>
        <div>
          <EditableSpan value={props.title} onchange={changeTodolistTitleHandler} />
          <IconButton onClick={removeTodolistHandler} size={'small'}>
            <Delete />
          </IconButton>
        </div>

        <div>
          <AddItemForm addItem={addTaskHandler} />
        </div>
      </div>

      <div>
        {tasksForTodolist.map(task => {
          return (
            <Task
              key={task.id}
              task={task}
              todolistId={props.id}
              removeTask={props.removeTask}
              changeTaskStatus={props.changeTaskStatus}
              changeTaskTitle={props.changeTaskTitle}
            />
          )
        })}
      </div>
      <div>
        <Button
          variant={props.filter === 'all' ? 'contained' : 'text'}
          color={'primary'}
          size={'small'}
          onClick={allFilterHandler}
        >
          All
        </Button>
        <Button
          variant={props.filter === 'active' ? 'contained' : 'text'}
          color={'secondary'}
          size={'small'}
          onClick={activeFilterHandler}
        >
          Active
        </Button>
        <Button
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          color={'success'}
          size={'small'}
          onClick={completedFilterHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})