import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddItemForm } from '../components/AddItemForm/AddItemForm'

export default {
  title: 'TODO/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: { description: 'Buttton clicked' },
  },
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = args => <AddItemForm {...args} />
const StoryWithErrorsTemplate: ComponentStory<typeof AddItemForm> = args => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>('Title is required')
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
      args.addItem(title.trim())
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
      />
      <IconButton color={'primary'} onClick={addTaskHandler}>
        <AddBoxOutlinedIcon />
      </IconButton>
    </div>
  )
}

export const Primary = Template.bind({})
Primary.args = {
  addItem: action('button clicked'),
}

export const StoryWithErrors = StoryWithErrorsTemplate.bind({})
StoryWithErrors.args = {
  addItem: action('button clicked'),
}
