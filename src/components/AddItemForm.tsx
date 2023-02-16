import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import TextField from "@mui/material/TextField";

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
        setError(null)
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
                       size={'small'}/>
            <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                    onClick={addTaskHandler}>
                <AddBoxOutlinedIcon/>
            </Button>

            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

