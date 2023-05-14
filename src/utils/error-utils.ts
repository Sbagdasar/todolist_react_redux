import { AxiosError, isAxiosError } from 'axios'
import { Dispatch } from 'redux'

import { ResponseType } from '../api/todolist-api'
import {
  setAppErrorAC,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from '../app/app-reducer'

// generic function
export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: ErrorUtilsDispatchType
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (
  err: Error | AxiosError<{ message: string }>,
  dispatch: ErrorUtilsDispatchType
) => {
  let message = err.message

  if (isAxiosError(err)) {
    message = err.response?.data?.message || err.message
  }
  dispatch(setAppErrorAC(message))

  dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
