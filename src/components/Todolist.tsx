import React from 'react';
import {FilterValueType, TaskType} from "../App";

export type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId:number)=>void
    filter:(filter:FilterValueType)=>void
}
export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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
