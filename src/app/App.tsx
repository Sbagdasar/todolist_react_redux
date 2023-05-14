import React, { useEffect } from 'react'

import './App.css'
import MenuIcon from '@mui/icons-material/Menu'
import { CircularProgress, LinearProgress } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Navigate, Route, Routes } from 'react-router-dom'

import { TaskType } from '../api/todolist-api'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { logoutTC, setIsLoggedInAC } from '../features/Login/auth-reducer'
import { Login } from '../features/Login/Login'
import { TodoListsList } from '../features/TodolistsList/TodolistsList'
import { useAppDispatch, useAppSelector } from '../hooks/appHooks'

import { initializeAppTC, RequestStatusType } from './app-reducer'

export type TasksStateType = {
  [key: string]: TaskType[]
}

export function App() {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

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
          {isLoggedIn && (
            <Button onClick={logoutHandler} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodoListsList />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path={'*'} element={<Navigate to={'/404'} />} />
        </Routes>
      </Container>
    </div>
  )
}
