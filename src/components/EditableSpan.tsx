import React, {ChangeEvent, useState} from 'react';
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
    value: string
    onchange:(title:string)=>void
}
export const EditableSpan = ({value, onchange}:EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(value)
    const changeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        onchange(title)
    }
    return (
        <>
            {
                editMode ? <TextField autoFocus size={'small'} value={title} onChange={changeTitleHandler} onBlur={activateViewMode}/>
                    :
                    <span onDoubleClick={activateEditMode}>{value}</span>
            }
        </>
    );
};

