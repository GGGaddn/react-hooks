import React, {useState, useEffect}  from 'react'
import TodoList from './TodoList'
import {Context} from './context'

export default function App()  {
  const [todos, setTodos] = useState([])
  const [todoTitle, setTodoTitle] = useState('')

  useEffect(() => {
    const raw = localStorage.getItem('todos') || []
    setTodos(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos))
  }, [todos])

  const addTodo = event => {
    if (event.key === 'Enter') {
      setTodos ([
        ...todos,
        {
          id: Date.now(),
          title: todoTitle,
          completed: false
        }
      ])
      setTodoTitle('')
    }
  }

  const removeTodo = id => {
    setTodos(todos.filter(todo => {
      return todo.id !== id
    }))
  }

  const toggleTodo = id => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.complete = !todo.complete
      }
      return todo
    }))
  }
  return (
      <Context.Provider value={{
        toggleTodo, removeTodo
      }}>
        <div className="container">
          <h1>Todo app</h1>

          <div className="input-field">
            <input
                type="text"
                value={todoTitle}
                onChange={event => setTodoTitle(event.target.value)}
                onKeyPress={addTodo}
            />
            <label>Todo name</label>
          </div>

          <TodoList todos={todos} />
        </div>
      </Context.Provider>
  );
}