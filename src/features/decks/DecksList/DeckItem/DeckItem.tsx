import s from './DeckItem.module.css'
import { useAppDispatch } from '../../../../app/store.ts'
import { deleteDeckTC, updateDeckTC } from '../../decks-thunks.ts'
import { Deck } from '../../decks-api.ts'
import { useState } from 'react'

type DeckProps = {
  deck: Deck
}

const TEST_ACC_NAME = 'Nik-Kik-Shpink'

export const DeckItem = ({ deck }: DeckProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const isTestingDeck = deck.author.name === TEST_ACC_NAME
  const dispatch = useAppDispatch()

  const handleDeleteButtonClick = () => {
    setIsLoading(true) // 1. Устанавливаем состояние загрузки в true
    dispatch(deleteDeckTC(deck.id)) // 2. Вызываем thunk для удаления колоды
      .then(() => {
        setIsLoading(false) // 3. После завершения устанавливаем состояние загрузки в false
      })
  }

  const handleEditButtonClick = () => {
    setIsLoading(true) // 1. Устанавливаем состояние загрузки в true
    dispatch(updateDeckTC({ id: deck.id, name: `${deck.name} updated` })) // 2. Вызываем thunk для обновления колоды
      .then(() => {
        setIsLoading(false) // 3. После завершения устанавливаем состояние загрузки в false
      })
  }


  return (
    <li className={s.item}>
      <h3 className={s.title}>
        {deck.name}
        {isTestingDeck && '✨'}
      </h3>
      <p className={s.characteristic}>
        <b>Author:</b> {deck.author.name}
      </p>
      <p className={s.characteristic}>
        <b>Created:</b> {new Date(deck.created).toLocaleString('ru-Ru')}
      </p>
      <p className={s.characteristic}>
        <b>Updated:</b> {new Date(deck.updated).toLocaleString('ru-Ru')}
      </p>

      {isTestingDeck && (
        <div className={s.buttonBox}>
          <button onClick={handleEditButtonClick} disabled={isLoading}>update</button>
          <button onClick={handleDeleteButtonClick} disabled={isLoading}>delete</button>
        </div>
      )}
    </li>
  )
}

