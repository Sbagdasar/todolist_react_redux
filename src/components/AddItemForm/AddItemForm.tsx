import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}
export const AddItemForm = memo((props: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
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
      <TextField
        error={!!error}
        value={title}
        onChange={onChangeTitle}
        onKeyUp={onKeyPressHandler}
        size={'small'}
        label={'Title'}
        helperText={error}
        disabled={props.disabled}
      />
      <IconButton color={'primary'} onClick={addTaskHandler} disabled={props.disabled}>
        <AddBoxOutlinedIcon />
      </IconButton>
    </div>
  )
})
