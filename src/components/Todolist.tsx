import React from 'react';
import {TaskType} from "../App";

export type TodolistPropsType = {
    title:string
    tasks:TaskType[]
}
export const Todolist = (props:TodolistPropsType) => {
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
                        return  <li key={task.id}><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li>
                    })
                }


            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
