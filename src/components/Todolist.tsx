import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

export type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (id: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    filter: FilterValuesType
}
export const Todolist = (props: TodolistPropsType) => {
    const addTaskHandler = (title: string) => {
        props.addTask(props.id, title)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    const allFilterHandler = () => {
        props.changeFilter(props.id, 'all')
    }
    const activeFilterHandler = () => {
        props.changeFilter(props.id, 'active')
    }
    const completedFilterHandler = () => {
        props.changeFilter(props.id, 'completed')
    }
    return (
        <div>
            <div>
                <div>
                    <EditableSpan value={props.title} onchange={changeTodolistTitleHandler}/>
                    <IconButton onClick={removeTodolistHandler} size={'small'}>
                        <Delete/>
                    </IconButton>
                </div>

                <div>
                    <AddItemForm addItem={addTaskHandler}/>
                </div>
            </div>

            <div>
                {
                    props.tasks.map(task => {
                        const removeTaskHandler = () => {
                            props.removeTask(props.id, task.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            props.changeTaskTitle(props.id, task.id, title)
                        }
                        return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <Checkbox checked={task.isDone} color={'primary'} onChange={changeTaskStatusHandler}/>
                            <EditableSpan value={task.title} onchange={changeTaskTitleHandler}/>

                            <IconButton onClick={removeTaskHandler} size={'small'}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }


            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} size={'small'}
                        onClick={allFilterHandler}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'text'} size={'small'}
                        onClick={activeFilterHandler}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'text'} size={'small'}
                        onClick={completedFilterHandler}>Completed
                </Button>
            </div>
        </div>
    );
};
