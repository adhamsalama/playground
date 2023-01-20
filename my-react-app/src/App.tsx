import React, { useState } from "react";
import { TodoList } from "./components/todolist";
import { ITodo, Status, updateFunction } from "./types";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoForm from "./components/form";
// import Container from "react-bootstrap/Container";
import { Container } from "@mui/material";

function App() {
  const [todos, setTodos]: [ITodo[], any] = useState([]);

  const updateTodo: updateFunction = (id: number, status: Status) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status };
      }
      return todo;
    });
    setTodos(newTodos);
  };
  return (
    <>
      <Container style={{ padding: "10px", margin: "10px" }}>
        <TodoForm
          addTodo={(title: string, status: Status) => {
            setTodos([...todos, { id: todos.length + 1, title, status }]);
            return true;
          }}
        />
        <br></br>
        {todos.filter((todo) => todo.status !== Status.Done).length} unfinished
        todos
        <TodoList todos={todos} update={updateTodo} />
      </Container>
    </>
  );
}

export default App;
