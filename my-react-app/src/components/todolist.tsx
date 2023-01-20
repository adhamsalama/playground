import { ITodo, updateFunction } from "../types";
import Todo from "./todo";

export function TodoList(props: { todos: ITodo[]; update: updateFunction }) {
  return (
    <div>
      {props.todos.map((todo) => (
        <Todo key={todo.id} todo={todo} update={props.update} />
      ))}
    </div>
  );
}
