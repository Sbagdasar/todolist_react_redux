import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { App } from '../app/App'

import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator'

export default {
  title: 'TODO/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = args => <App />

export const StoryAppWithRedux = Template.bind({})
StoryAppWithRedux.args = {}
