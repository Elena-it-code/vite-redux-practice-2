import { AppRootState } from './store.ts'

// Добавим селектор для получения статуса загрузки из Redux-состояния
export const selectAppStatus = (state: AppRootState) => state.app.status;
// Добавим селектор для получения ошибки из Redux-состояния
export const selectAppError = (state: AppRootState) => state.app.error;
