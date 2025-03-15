import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import { isAxiosError } from 'axios'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading')) // Устанавливаем статус загрузки
  try {
    const res = await decksAPI.fetchDecks() // Выполняем запрос
    dispatch(setAppStatusAC('succeeded')) // Устанавливаем статус успешного завершения
    dispatch(setDecksAC(res.data.items))
  } catch (error) {
    dispatch(setAppStatusAC('failed')) // Устанавливаем статус ошибки
    console.error('Ошибка при загрузке колод:', error) // Логируем ошибку для отладки
  }
}


export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params) // Выполняем запрос на обновление колоды
    dispatch(updateDeckAC(res.data)) // Если запрос успешен, обновляем состояние Redux
  } catch (e) {
    let errorMessage: string

    // Проверяем, является ли ошибка AxiosError
    if (isAxiosError<ServerError>(e)) {
      // Ошибка от бэкенда или сети
      errorMessage = e.response ? e.response.data?.errorMessages[0].message : e.message
    } else {
      // Ошибка не связана с axios
      errorMessage = (e as Error).message
    }
    // Логируем ошибку для отладки
    console.log(errorMessage)

  }
}

// Тип для ошибки, возвращаемой сервером
type ServerError = {
  errorMessages: Array<{ field: string; message: string }>
}




// 2 подход к реализации задачи
/*let errorMessage: string

// Проверяем, является ли ошибка экземпляром AxiosError
if (isAxiosError(e)) {
  // Ошибка от бэкенда
  if (e.response && e.response.data) {
    // Извлекаем первое сообщение об ошибке из массива errorMessages
    const errorMessages = e.response.data.errorMessages
    if (errorMessages && errorMessages.length > 0) {
      errorMessage = errorMessages[0].message // Берём первое сообщение
    } else {
      errorMessage = 'Ошибка от сервера'
    }
  }
  // Ошибка сети
  else if (e.message) {
    errorMessage = e.message
  }
  // Обработка неизвестной ошибки
  else {
    errorMessage = 'Произошла неизвестная ошибка'
  }
  // Обработка ошибки, не связанной с axios
} else {
  errorMessage = 'Произошла неизвестная ошибка'
}
// Логируем ошибку для отладки
console.error('Ошибка при обновлении колоды:', errorMessage)*/


// import { isAxiosError } from 'axios';
// Что происходит:
//   Импортируется функция isAxiosError из библиотеки axios.
//   Зачем: Эта функция помогает определить, является ли ошибка экземпляром AxiosError, что упрощает обработку ошибок,
//   связанных с HTTP-запросами.

// Проверка типа ошибки с помощью isAxiosError:
// if (isAxiosError(e)) {
// Что происходит:
//   Проверяется, является ли ошибка e экземпляром AxiosError.
//   Зачем: Это позволяет разделить обработку ошибок на два типа: ошибки от бэкенда и ошибки сети.

// Ошибка от бэкенда
// Что происходит:
//   Проверяется, есть ли e.response.data (ответ от сервера).
//   Извлекается массив errorMessages из e.response.data.
//   Если массив errorMessages не пустой, берется первое сообщение об ошибке (errorMessages[0].message).
//   Если сообщение отсутствует, используется стандартное сообщение "Ошибка от сервера".
//   Зачем: Обрабатываются ошибки, которые возвращает сервер (например, статус 400 или 500).

// Ошибка сети
// Что происходит:
//   Если ошибка не связана с ответом сервера, но имеет свойство message, это сообщение используется как текст ошибки.
//   Зачем: Обрабатываются ошибки сети (например, отсутствие интернета или проблемы с подключением).

// Обработка неизвестной ошибки
// Что происходит:
//   Если ошибка не подпадает под предыдущие категории, используется стандартное сообщение.
//   Зачем: Обрабатываются ошибки, которые не удалось классифицировать.

// Обработка ошибки, если она не является AxiosError
// Что происходит:
//   Если ошибка не является экземпляром AxiosError, используется стандартное сообщение.
//   Зачем: Обрабатываются ошибки, которые не связаны с HTTP-запросами.

