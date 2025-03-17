import { Equal, Expect } from '../common/utils/ts-helpers.ts'

// task 1
// Универсальная функция для получения последнего элемента массива
const getLastItem = <T>(array: Array<T>): T => {
  return array[array.length - 1]
}

// Пример использования с массивом строк
const item1 = getLastItem(['react', 'typescript'])
// Пример использования с массивом чисел
const item2 = getLastItem([1, 2])

// Проверка типов
type test1 = [Expect<Equal<typeof item1, string>>] // Убеждаемся, что item1 — строка
type test2 = [Expect<Equal<typeof item2, number>>] // Убеждаемся, что item2 — число
