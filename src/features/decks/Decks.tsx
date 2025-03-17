import { DecksList } from './DecksList/DecksList.tsx'
import { AddNewDeckForm } from './AddNewDeckForm/AddNewDeckForm.tsx'

export const Decks = () => {
  return (
    <div>
      <h1>Decks 🐈</h1>
      <AddNewDeckForm />
      <DecksList />
      <footer>
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      </footer>
    </div>
  )
}
