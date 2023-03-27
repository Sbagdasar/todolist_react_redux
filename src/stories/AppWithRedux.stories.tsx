import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AppWithRedux } from '../AppWithRedux'

import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator'

export default {
  title: 'TODO/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof AppWithRedux>

const Template: ComponentStory<typeof AppWithRedux> = args => <AppWithRedux />

export const StoryAppWithRedux = Template.bind({})
StoryAppWithRedux.args = {}
