import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
export function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: number)=>{
        setTasks(tasks.filter(t=> t.id !== taskId))
    }

    return (
        <div className="App">
            <Todolist title={'What to buy'} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}


