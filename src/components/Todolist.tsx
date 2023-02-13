import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from "../App";

export type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (id: string, filter: FilterValueType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValueType
}
export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.id, title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }

    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
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
                    <span>{props.title}</span>
                    <button onClick={removeTodolistHandler}>X</button>
                </div>

                <div>
                    <input className={error ? 'error' : ''} value={title} onChange={onChangeTitle}
                           onKeyUp={onKeyPressHandler}/>
                    <button onClick={addTaskHandler}>+</button>
                </div>
                {error && <span className={'error-message'}>{error}</span>}
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
                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <span>{task.title}</span>
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
