import React, { useReducer } from 'react'

import './App.css'
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

import { TaskPriorities, TaskStatuses } from './api/todolist-api'
import { AddItemForm } from './components/AddItemForm'
import { Todolist } from './components/Todolist'
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './state/tasks-reducer'
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
  todolistsReducer,
} from './state/todolists-reducer'

export function AppWithReducer() {
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, todolistsDispatch] = useReducer(todolistsReducer, [
    { id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 1 },
  ])

  let [tasks, tasksDispatch] = useReducer(tasksReducer, {
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
    tasksDispatch(removeTaskAC(taskId, todolistId))
  }
  const addTask = (todolistId: string, title: string) => {
    tasksDispatch(addTaskAC(title, todolistId))
  }
  const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    tasksDispatch(changeTaskStatusAC(taskId, status, todolistId))
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    tasksDispatch(changeTaskTitleAC(taskId, title, todolistId))
  }
  const changeFilter = (id: string, filter: FilterValuesType) => {
    todolistsDispatch(changeTodolistFilterAC(id, filter))
  }

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)

    tasksDispatch(action)
    todolistsDispatch(action)
  }
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title)

    todolistsDispatch(action)
    tasksDispatch(action)
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    todolistsDispatch(changeTodolistTitleAC(todolistId, title))
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
