import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (id: string, filter: FilterValueType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle:(todolistId: string, taskId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    filter: FilterValueType
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
                    <button onClick={removeTodolistHandler}>X</button>
                </div>

                <div>
                    <AddItemForm addItem={addTaskHandler}/>
                </div>
            </div>

            <ul>
                {
                    props.tasks.map(task => {
                        const removeTaskHandler = () => {
                            props.removeTask(props.id, task.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
                        }
                        const changeTaskTitleHandler = (title:string) => {
                            props.changeTaskTitle(props.id, task.id, title)
                        }
                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <EditableSpan value={task.title} onchange={changeTaskTitleHandler}/>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    })
                }


            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={allFilterHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={activeFilterHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={completedFilterHandler}>Completed
                </button>
            </div>
        </div>
    );
};
