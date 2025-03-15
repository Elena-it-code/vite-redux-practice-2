import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import { handleError } from '../../common/utils/handle-error.ts'

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
  } catch (error) {
    handleError(dispatch, error) // Обрабатываем ошибку
  }
}
