import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../AppWithRedux";

type TaskPropsType = {
    task:TaskType
    todolistId:string
    removeTask:(todolistId: string, taskId: string)=>void
    changeTaskStatus:(todolistId: string, taskId: string, isDone: boolean)=>void
    changeTaskTitle:(todolistId: string, taskId: string, title: string)=>void
}
export const Task = (props:TaskPropsType) => {
    const removeTaskHandler = () => {
        props.removeTask(props.todolistId, props.task.id)
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    }
    const changeTaskTitleHandler = (title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title)
    }
    return (
        <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox checked={props.task.isDone} color={'primary'} onChange={changeTaskStatusHandler}/>
            <EditableSpan value={props.task.title} onchange={changeTaskTitleHandler}/>

            <IconButton onClick={removeTaskHandler} size={'small'}>
                <Delete/>
            </IconButton>
        </div>
    );
};

