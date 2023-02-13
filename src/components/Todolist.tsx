import React, {ChangeEvent, useState} from 'react';
import {FilterValueType, TaskType} from "../App";

export type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId:string)=>void
    filter:(filter:FilterValueType)=>void
    addTask:(title:string)=>void
}
export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.addTask(title)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTitle}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>props.removeTask(task.id)}>X</button>
                        </li>
                    })
                }


            </ul>
            <div>
                <button onClick={()=>props.filter('all')}>All</button>
                <button onClick={()=>props.filter('active')}>Active</button>
                <button onClick={()=>props.filter('completed')}>Completed</button>
            </div>
        </div>
    );
};
