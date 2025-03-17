type MyComponentProps<T> = {
  items: T[]; // Массив элементов типа T
  defaultItem: T; // Элемент типа T
}

function MyComponent<T>(props: MyComponentProps<T>) { // Тип T будет автоматически выведен на основе переданных пропсов.
  console.log(props)
  return <p>some content</p>
}

const App = () => {
  const users: User[] = [
    { name: 'Bilbo', age: 111 },
    { name: 'Frodo', age: 33 },
  ]

  return (
    <>
      {/* Пример со строками */}
      <MyComponent items={['react', 'typescript']} defaultItem={'9'} />
      {/* Пример с числами */}
      <MyComponent<number> items={[1, 2, 3]} defaultItem={9} />
      {/* Пример с объектами */}
      <MyComponent<User> items={users} defaultItem={{ name: 'Gandalf', age: 1000 }} />
    </>
  )
}

type User = {
  name: string
  age: number
}
