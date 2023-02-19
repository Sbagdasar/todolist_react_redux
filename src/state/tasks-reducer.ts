import {TasksStateType} from "../App";

type StateType = TasksStateType
type ActionType = RemoveTaskActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}

export const tasksReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":{
            return {...state, [action.todolistId]:state[action.todolistId].filter(t=>t.id!==action.id)}
        }
        default:
            return state
    }
}

export const removeTaskAC = (id:string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}
