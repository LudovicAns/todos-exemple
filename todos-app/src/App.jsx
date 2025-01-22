import TodoForm from './composants/TodoForm'
import TodosList from './composants/TodosList'
import TodosProvider from './composants/TodosProvider'
import './index.css'
function App() {

  return (
    <main className='bg-neutral-800 h-screen'>
      <h1 className='text-2xl text-neutral-200 text-center p-4'>Todo App</h1>
      <TodosProvider>
        <TodoForm />
        <TodosList />
      </TodosProvider>
    </main>
  )
}

export default App
