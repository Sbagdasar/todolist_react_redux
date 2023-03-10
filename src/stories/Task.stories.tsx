import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";

export default {
    title: 'TODO/Task',
    args: {
        changeTaskStatus: action('changed task status'),
        changeTaskTitle: action('changed task Title'),
        removeTask: action('task removed'),
        task: {id: '1', title: 'CSS', isDone: true},
        todolistId: 'todolistId1'
    },
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;
export const StoryTaskIsDone = Template.bind({});
StoryTaskIsDone.args = {};
export const StoryTaskIsNotDone = Template.bind({});
StoryTaskIsNotDone.args = {

    task: {id: '1', title: 'CSS', isDone: false},
};