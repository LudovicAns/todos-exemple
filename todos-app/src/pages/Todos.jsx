import React from 'react';
import TodoForm from "../composants/TodoForm.jsx";
import TodosList from "../composants/TodosList.jsx";
import TodosProvider from "../composants/TodosProvider.jsx";

export default Todos;

function Todos(props) {
    return (
        <main className='bg-neutral-800 h-screen'>
            <h1 className='text-2xl text-neutral-200 text-center p-4'>Todo App</h1>
            <TodosProvider>
                <TodoForm/>
                <TodosList/>
            </TodosProvider>
        </main>
    );
}
