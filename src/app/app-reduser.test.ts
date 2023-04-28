import { appReducer, RequestStatusType, setAppErrorAC, setAppStatusAC } from './app-reducer'

type StartStateType = {
  status: RequestStatusType
  error: null | string
}

let startState: StartStateType

beforeEach(() => {
  startState = { status: 'idle', error: null }
})

test('set app status', () => {
  const action = setAppStatusAC('loading')

  const endState = appReducer(startState, action)

  expect(endState).toEqual({ status: 'loading', error: null })
})
test('set app error message', () => {
  const action = setAppErrorAC('some error occurred')

  const endState = appReducer(startState, action)

  expect(endState.error).toBe('some error occurred')
})
