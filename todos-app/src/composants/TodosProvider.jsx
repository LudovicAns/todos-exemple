import { createContext, useEffect, useState } from "react"

export const TodoContext = createContext();

export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/api/todos').then((reponse) => {
      reponse.json().then((data) => {
        setTodos(data);
      })
    });
  }, []);

  async function createTodo(todoContenu) {
    const reponse = await fetch('/api/todos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: todoContenu })
    });
    const data = await reponse.json();
    setTodos([...todos, data.todo]);
  }


  async function deleteTodo(id) {
    const reponse = await fetch("/api/todos/" + id, {
      method: "DELETE"
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  }

  // Exercice:
  // 1. Créer une fonction async qui reçoit l'id de la todo, et un boolean
  async function updateTodoStatus(id, status) {
    // 2. Effectuer une requete PUT vers la backend en envoyant l'inverse de isFinished
    const reponse = await fetch("/api/todos/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ isFinished: status })
    });
    const data = await reponse.json();
    // 3. Mettre a jour la liste todos
    setTodos(todos.map((todo) => todo._id === id ? data.todo : todo));
  }
  // 4. Ajouter la fonction dans le context
  return (
    <TodoContext.Provider value={{
      todos: todos,
      createTodo: createTodo,
      deleteTodo: deleteTodo,
      updateTodoStatus: updateTodoStatus
    }}>
      {children}
    </TodoContext.Provider>
  )
}
