import React, { useCallback, useEffect } from 'react'

import { Paper } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import { useSelector } from 'react-redux'

import { TaskStatuses } from '../../api/todolist-api'
import { TasksStateType } from '../../app/App'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { Todolist } from '../../components/Todolist'
import { useAppDispatch } from '../../hooks/appHooks'
import { AppRootStateType } from '../../state/store'
import { createTaskTC, removeTaskTC, updateTaskTC } from '../../state/tasks-reducer'
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  createTodoListTC,
  FilterValuesType,
  getTodolistsTC,
  removeTodoListTC,
  TodolistDomainType,
} from '../../state/todolists-reducer'

export const TodoListsList = () => {
  let dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodolistsTC())
  }, [])

  let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

  let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  const removeTask = useCallback(
    (todolistId: string, taskId: string) => {
      dispatch(removeTaskTC(todolistId, taskId))
    },
    [dispatch]
  )
  const addTask = useCallback(
    (todolistId: string, title: string) => {
      dispatch(createTaskTC(todolistId, title))
    },
    [dispatch]
  )
  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todolistId, taskId, { status }))
    },
    [dispatch]
  )

  const changeTaskTitle = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      dispatch(updateTaskTC(todolistId, taskId, { title }))
    },
    [dispatch]
  )
  const changeFilter = useCallback(
    (id: string, filter: FilterValuesType) => {
      dispatch(changeTodolistFilterAC(id, filter))
    },
    [dispatch]
  )

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodoListTC(todolistId))
    },
    [dispatch]
  )
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodoListTC(title))
    },
    [dispatch]
  )
  const changeTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      dispatch(changeTodolistTitleTC(todolistId, title))
    },
    [dispatch]
  )

  return (
    <>
      <Grid2 container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid2>
      <Grid2 container spacing={3}>
        {todolists.map(todolist => {
          let filteredTasks = tasks[todolist.id]

          return (
            <Grid2 key={todolist.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  key={todolist.id}
                  id={todolist.id}
                  title={todolist.title}
                  tasks={filteredTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                  filter={todolist.filter}
                />
              </Paper>
            </Grid2>
          )
        })}
      </Grid2>
    </>
  )
}