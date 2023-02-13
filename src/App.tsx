import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type FilterValueType = 'all' | 'completed' | 'active'

export type TasksStateType = {
    [key:string]: TaskType[]
}
export function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const removeTask = (todolistId: string, taskId: string) => {

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId:string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const changeFilter = (id: string, filter: FilterValueType) => {
        setTodolists(todolists.map(tl => tl.id === id ? {...tl, filter} : tl))
    }

    const removeTodolist = (todolistId:string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (title:string) => {
        let newTodolistId = v1()
        setTodolists([{id:newTodolistId, title, filter:'all'}, ...todolists])
        setTasks({...tasks, [newTodolistId]:[]})
        debugger
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(todolist => {

                    let filteredTasks = tasks[todolist.id]

                    if (todolist.filter === 'active') {
                        filteredTasks = filteredTasks.filter(t => !t.isDone)
                    } else if (todolist.filter === 'completed') {
                        filteredTasks = filteredTasks.filter(t => t.isDone)

                    }

                    return <Todolist key={todolist.id}
                                     id={todolist.id}
                                     title={todolist.title}
                                     tasks={filteredTasks}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     removeTodolist={removeTodolist}
                                     filter={todolist.filter}
                    />
                })
            }

        </div>
    );
}


