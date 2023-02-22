import React, {useReducer} from 'react';
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
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

export function AppWithReducer() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, todolistsDispatch] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'NextJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const removeTask = (todolistId: string, taskId: string) => {

        tasksDispatch(removeTaskAC(taskId,todolistId))
    }
    const addTask = (todolistId: string, title: string) => {
        tasksDispatch(addTaskAC(title, todolistId))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        tasksDispatch(changeTaskStatusAC(taskId,isDone,todolistId))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        tasksDispatch(changeTaskTitleAC(taskId,title,todolistId))
    }
    const changeFilter = (id: string, filter: FilterValuesType) => {
        todolistsDispatch(changeTodolistFilterAC(id,filter))
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
        todolistsDispatch(changeTodolistTitleAC(todolistId,title))
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


