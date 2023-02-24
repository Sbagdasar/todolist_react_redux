import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)

        }
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }

    }
    return (
        <div>
            <TextField error={!!error}
                       value={title}
                       onChange={onChangeTitle}
                       onKeyUp={onKeyPressHandler}
                       size={'small'} label={'Title'} helperText={error}/>
            <IconButton color={'primary'}
                    onClick={addTaskHandler}>
                <AddBoxOutlinedIcon/>
            </IconButton>

        </div>
    );
};

