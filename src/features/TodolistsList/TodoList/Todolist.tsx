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
import { FilterValuesType, TodolistDomainType } from './todolists-reducer'

export type TodolistPropsType = {
  todolist: TodolistDomainType
  tasks: TaskType[]
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (id: string, filter: FilterValuesType) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
}
export const Todolist = memo(({ todolist, ...props }: TodolistPropsType) => {
  let dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setTasksTC(todolist.id))
  }, [])

  const addTaskHandler = useCallback(
    (title: string) => {
      props.addTask(todolist.id, title)
    },
    [props.addTask, todolist.id]
  )
  const removeTodolistHandler = () => {
    props.removeTodolist(todolist.id)
  }
  const changeTodolistTitleHandler = (title: string) => {
    props.changeTodolistTitle(todolist.id, title)
  }

  const allFilterHandler = useCallback(() => {
    props.changeFilter(todolist.id, 'all')
  }, [props.changeFilter, todolist.id])
  const activeFilterHandler = useCallback(() => {
    props.changeFilter(todolist.id, 'active')
  }, [props.changeFilter, todolist.id])
  const completedFilterHandler = useCallback(() => {
    props.changeFilter(todolist.id, 'completed')
  }, [props.changeFilter, todolist.id])

  let tasksForTodolist = props.tasks

  if (todolist.filter === 'active') {
    tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
  } else if (todolist.filter === 'completed') {
    tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <div>
        <div>
          <EditableSpan value={todolist.title} onchange={changeTodolistTitleHandler} />
          <IconButton
            onClick={removeTodolistHandler}
            size={'small'}
            disabled={todolist.entityStatus === 'loading'}
          >
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
              todolistId={todolist.id}
              removeTask={props.removeTask}
              changeTaskStatus={props.changeTaskStatus}
              changeTaskTitle={props.changeTaskTitle}
            />
          )
        })}
      </div>
      <div>
        <Button
          variant={todolist.filter === 'all' ? 'contained' : 'text'}
          color={'primary'}
          size={'small'}
          onClick={allFilterHandler}
        >
          All
        </Button>
        <Button
          variant={todolist.filter === 'active' ? 'contained' : 'text'}
          color={'secondary'}
          size={'small'}
          onClick={activeFilterHandler}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === 'completed' ? 'contained' : 'text'}
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
