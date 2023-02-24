import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'completed' | 'active'

export type TasksStateType = {
    [key: string]: TaskType[]
}

export function AppWithRedux() {

    let todolists= useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
let dispatch = useDispatch()

    const removeTask = (todolistId: string, taskId: string) => {

        dispatch(removeTaskAC(taskId,todolistId))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId,isDone,todolistId))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(taskId,title,todolistId))
    }
    const changeFilter = (id: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id,filter))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    },[])
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId,title))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid2 container style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid2>
                <Grid2 container spacing={3}>
                    {
                        todolists.map(todolist => {

                            let filteredTasks = tasks[todolist.id]

                            if (todolist.filter === 'active') {
                                filteredTasks = filteredTasks.filter(t => !t.isDone)
                            } else if (todolist.filter === 'completed') {
                                filteredTasks = filteredTasks.filter(t => t.isDone)

                            }

                            return <Grid2 key={todolist.id}>
                                <Paper style={{padding:'10px'}}>
                                    <Todolist key={todolist.id}
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



                        })
                    }
                </Grid2>

            </Container>
        </div>
    );
}


