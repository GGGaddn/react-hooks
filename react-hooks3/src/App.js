import React, {useState, useEffect, useReducer}  from 'react'
import TodoList from './TodoList'
import {Context} from './context'
import reducer from './reduser'

export default function App()  {
  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos')))
  const [todoTitle, setTodoTitle] = useState('')

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(state))
  }, [state])

    const addTodo = event => {
      if (event.key === 'Enter') {
        dispatch({
          type: 'add',
          payload: todoTitle
        })
        setTodoTitle('')
      }
    }
    // setTodos ([
    //   ...state,
    //   {
    //     id: Date.now(),
    //     title: todoTitle,
    //     completed: false
    //   }
    // ])

    // const removeTodo = id => {
    //     setTodos(todos.filter(todo => {
    //       return todo.id !== id
    //     }))
    //   }
    //
    // const toggleTodo = id => {
    //     setTodos(todos.map(todo => {
    //       if (todo.id === id) {
    //         todo.complete = !todo.complete
    //       }
    //       return todo
    //     }))
    //   }

  return (
      <Context.Provider value={{
        dispatch
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

          <TodoList todos={state} />
        </div>
      </Context.Provider>
  );
}