import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useAppSelector } from '../store.ts'
import { selectAppError } from '../app-selectors.ts'

export const GlobalError = () => {
  // Получаем сообщение об ошибке из Redux-состояния
  const errorMessage = useAppSelector(selectAppError)

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  // Возвращается компонент ToastContainer из библиотеки react-toastify для отображения уведомлений
  return <ToastContainer theme="light" autoClose={3000} />
}
