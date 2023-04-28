import React from 'react'

import './App.css'
import MenuIcon from '@mui/icons-material/Menu'
import { LinearProgress } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { TaskType } from '../api/todolist-api'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { TodoListsList } from '../features/TodolistsList/TodolistsList'
import { useAppSelector } from '../hooks/appHooks'

import { RequestStatusType } from './app-reducer'

export type TasksStateType = {
  [key: string]: TaskType[]
}

export function App() {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)

  return (
    <div className="App">
      <ErrorSnackbar />
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
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <TodoListsList />
      </Container>
    </div>
  )
}
