import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { selectAppStatus } from './app-selectors.ts'
import { useAppSelector } from './store.ts'
import { LinearLoader } from '../common/components/Loader/LinearLoader.tsx'

export const App = () => {
  const appStatus = useAppSelector(selectAppStatus)
  return (
    <div>
      {/* Рендерить компоненту LinearLoader при выполнени запроса fetchDecks */}
      {appStatus === 'loading' && <LinearLoader />}
      <Decks />
      <GlobalError />
    </div>
  )
}
