import {TasksStateType} from "../App";
import {v1} from "uuid";

type StateType = TasksStateType
type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    todolistId: string
    isDone: boolean
}

export const tasksReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        }
        default:
            return state
    }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId}
}
