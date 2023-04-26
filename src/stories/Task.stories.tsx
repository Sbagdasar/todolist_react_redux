import React from 'react'

import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TaskPriorities, TaskStatuses } from '../api/todolist-api'
import { Task } from '../features/TodolistsList/TodoList/Task/Task'

export default {
  title: 'TODO/Task',
  args: {
    changeTaskStatus: action('changed task status'),
    changeTaskTitle: action('changed task Title'),
    removeTask: action('task removed'),
    task: {
      id: '1',
      title: 'CSS',
      status: TaskStatuses.New,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: '',
      description: '',
      priority: TaskPriorities.Middle,
      todoListId: 'todolistId1',
    },
    todolistId: 'todolistId1',
  },
  component: Task,
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = args => <Task {...args} />

export const StoryTaskIsDone = Template.bind({})
StoryTaskIsDone.args = {}
export const StoryTaskIsNotDone = Template.bind({})
StoryTaskIsNotDone.args = {
  task: {
    id: '1',
    title: 'CSS',
    status: TaskStatuses.New,
    order: 0,
    addedDate: '',
    startDate: '',
    deadline: '',
    description: '',
    priority: TaskPriorities.Middle,
    todoListId: 'todolistId1',
  },
}
