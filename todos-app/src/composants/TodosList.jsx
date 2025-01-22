import { useContext, useState } from 'react'
import { TodoContext } from './TodosProvider'
import { CircleX, Check, History, LoaderCircle } from "lucide-react";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }

  return `${date.toLocaleString('fr', options).replace(' ', ' - ')}`
}

export default function TodosList() {
  const { todos, deleteTodo, updateTodoStatus } = useContext(TodoContext);
  const [deleteLoadingID, setDeleteLoadingID] = useState(null);

  async function handleDelete(id) {
    setDeleteLoadingID(id);
    await deleteTodo(id);
    setDeleteLoadingID(null);
  }

  async function handleUpdate(id, status) {
    await updateTodoStatus(id, status)
  }

  return (
    <ul className='space-y-4 px-4'>
      {todos.map((todo) => {
        return (
          <li key={todo._id}
            className={`bg-neutral-600 p-3 border-2 border-transparent ${todo.isFinished ? "border-b-green-600" : "border-b-orange-600"} text-neutral-100 text-lg rounded-md shadow-md`}>
            <div className='flex items-center gap-2'>
              <div className='flex gap-1'>
                <button onClick={() => handleDelete(todo._id)} className='bg-neutral-900/30 p-1 rounded-sm hover:bg-neutral-900/60'>
                  {deleteLoadingID === todo._id ?
                    <LoaderCircle size={20} color='red' className='animate-spin' /> :
                    <CircleX size={20} color='red' />
                  }
                </button>
                <button onClick={() => handleUpdate(todo._id, !todo.isFinished)}
                  className='bg-neutral-900/30 p-1 rounded-sm hover:bg-neutral-900/60'>
                  {todo.isFinished ?
                    <History size={20} color='orange' />
                    :
                    <Check size={20} color='green' />
                  }
                </button>
              </div>
              <p>{todo.contenu}</p>
            </div>

            <p className='text-neutral-400 text-right text-sm'>
              {formatDate(todo.date)}
            </p>
          </li>
        )
      })}
    </ul>
  )
}

// Exercice:
// 1. Créer un composant: TodoForm
// 2. Ajouter un formulaire avec un bouton
// 3. Lors de la soumission, tester quele contenu ne soit pas vide, max. 100. (Sinon afficher un erreur).
// 4. Log la todo.