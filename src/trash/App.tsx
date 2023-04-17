import React, { useEffect, useState } from 'react'

import '../app/App.css'
import MenuIcon from '@mui/icons-material/Menu'
import { Paper } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Unstable_Grid2'
import { v1 } from 'uuid'

import { TaskPriorities, TaskStatuses, TaskType, todolistAPI } from '../api/todolist-api'
import { AddItemForm } from '../components/AddItemForm/AddItemForm'
import { Todolist } from '../components/Todolist'
import { FilterValuesType, TodolistDomainType } from '../state/todolists-reducer'

export type TasksStateType = {
  [key: string]: TaskType[]
}

export function App() {
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    { id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 1 },
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: todolistID1,
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: todolistID1,
      },
      {
        id: v1(),
        title: 'ReactJS',
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: todolistID1,
      },
      {
        id: v1(),
        title: 'NextJS',
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: todolistID1,
      },
    ],
    [todolistID2]: [
      {
        id: v1(),
        title: 'Rest API',
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: todolistID2,
      },
      {
        id: v1(),
        title: 'GraphQL',
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: todolistID2,
      },
    ],
  })

  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) })
  }
  const addTask = (todolistId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: [
        {
          id: v1(),
          title,
          status: TaskStatuses.New,
          order: 0,
          addedDate: '',
          startDate: '',
          deadline: '',
          description: '',
          priority: TaskPriorities.Middle,
          todoListId: todolistId,
        },
        ...tasks[todolistId],
      ],
    })
  }
  const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, status } : t)),
    })
  }

  const changeFilter = (id: string, filter: FilterValuesType) => {
    setTodolists(todolists.map(tl => (tl.id === id ? { ...tl, filter } : tl)))
  }

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }
  const addTodolist = (title: string) => {
    let newTodolistId = v1()

    setTodolists([
      { id: newTodolistId, title, filter: 'all', addedDate: '', order: 3 },
      ...todolists,
    ])
    setTasks({ ...tasks, [newTodolistId]: [] })
    debugger
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl)))
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)),
    })
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid2 container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid2>
        <Grid2 container spacing={3}>
          {todolists.map(todolist => {
            let filteredTasks = tasks[todolist.id]

            if (todolist.filter === 'active') {
              filteredTasks = filteredTasks.filter(t => t.status === TaskStatuses.New)
            } else if (todolist.filter === 'completed') {
              filteredTasks = filteredTasks.filter(t => t.status === TaskStatuses.Completed)
            }

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
      </Container>
    </div>
  )
}
