import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
export type FilterValueType = 'all' | 'completed' | 'active'
export function App() {
    const [filter, setFilter] = useState<FilterValueType>('all')
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: number)=>{
        setTasks(tasks.filter(t=> t.id !== taskId))
    }

    let filteredTasks = tasks

    if(filter === 'active'){
        filteredTasks = filteredTasks.filter(t=> !t.isDone)
    }else if(filter=== 'completed'){
        filteredTasks = filteredTasks.filter(t=> t.isDone)

    }
    return (
        <div className="App">
            <Todolist title={'What to buy'} tasks={filteredTasks} removeTask={removeTask} filter={setFilter}/>
        </div>
    );
}


