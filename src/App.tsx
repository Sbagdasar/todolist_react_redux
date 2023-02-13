import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValueType = 'all' | 'completed' | 'active'
export function App() {
    const [filter, setFilter] = useState<FilterValueType>('all')
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: string)=>{
        setTasks(tasks.filter(t=> t.id !== taskId))
    }
    const addTask = (title:string) => {
        setTasks([{id:v1(), title, isDone:false}, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone : boolean) => {
        setTasks(tasks.map(t=> t.id === taskId? {...t, isDone}:t))
    }
    let filteredTasks = tasks

    if(filter === 'active'){
        filteredTasks = filteredTasks.filter(t=> !t.isDone)
    }else if(filter=== 'completed'){
        filteredTasks = filteredTasks.filter(t=> t.isDone)

    }
    return (
        <div className="App">
            <Todolist title={'What to buy'}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      setFilter={setFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}


