import { useContext, useState } from 'react'
import { TodoContext } from './TodosProvider';
import { LoaderCircle } from "lucide-react"
export default function TodoForm() {
  const [todoInput, setTodoInput] = useState("");
  const [todoError, setTodoError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { createTodo } = useContext(TodoContext);

  function handleTodoInput(e) {
    setTodoInput(e.target.value);
    setTodoError('');
  }

  async function submit() {
    if (todoInput == "") {
      setTodoError('Le contenu est obligatoire !');
      return;
    }
    if (todoInput.length > 100) {
      setTodoError('Le contenu est trop long ! (max: 100)');
      return;
    }
    setIsLoading(true);
    await createTodo(todoInput);
    setIsLoading(false);
  }

  return (
    <div className='flex gap-4 p-4 items-center justify-center'>
      <div>
        <input className='p-2 bg-neutral-700 text-neutral-300 rounded-sm'
          type="text"
          value={todoInput}
          onChange={handleTodoInput} />
        <p className='text-sm text-red-700'>{todoError}</p>
      </div>
      <button
        disabled={isLoading}
        className='bg-sky-600 text-neutral-300 p-2 rounded-sm'
        onClick={submit}>
        {isLoading ? <LoaderCircle className='animate-spin' /> : "Ajouter la tache"}
      </button>
    </div>
  )
}
