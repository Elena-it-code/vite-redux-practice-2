import { AppRootState } from './store.ts'

// Добавим селектор для статуса загрузки
export const selectAppStatus = (state: AppRootState) => state.app.status;