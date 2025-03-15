import { Dispatch } from 'redux'
import { setAppErrorAC } from '../../app/app-reducer.ts'
import { isAxiosError } from 'axios'

export type ServerError = {
  errorMessages: Array<{ field: string; message: string }>
}

export const handleError = (dispatch: Dispatch, error: unknown) => {
  let errorMessage: string

  // Проверяем, является ли ошибка AxiosError
  if (isAxiosError<ServerError>(error)) {
    // Ошибка от бэкенда или сети
    errorMessage = error.response ? error.response.data?.errorMessages[0].message : error.message
  } else {
    // Ошибка не связана с axios
    errorMessage = (error as Error).message
  }
  // Логируем ошибку для отладки
  console.log(errorMessage)

  // Передаем только сообщение об ошибке
  dispatch(setAppErrorAC(errorMessage))
}




