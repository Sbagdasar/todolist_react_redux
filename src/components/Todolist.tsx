import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from "../App";

export type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    filter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if(title.trim() !== ''){
            props.addTask(title.trim())
            setTitle('')
        }

    }

    const allFilterHandler = () => {
        props.filter('all')
    }
    const activeFilterHandler = () => {
        props.filter('active')
    }
    const completedFilterHandler = () => {
        props.filter('completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTitle} onKeyUp={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const removeTaskHandler = () => {
                            props.removeTask(task.id)
                        }
                        const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>)=>{
                            props.changeTaskStatus(task.id, e.currentTarget.checked)
                        }
                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <span>{task.title}</span>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    })
                }


            </ul>
            <div>
                <button onClick={allFilterHandler}>All</button>
                <button onClick={activeFilterHandler}>Active</button>
                <button onClick={completedFilterHandler}>Completed</button>
            </div>
        </div>
    );
};
