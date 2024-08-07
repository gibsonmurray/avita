import { ul } from "avita"
import { TodoItem } from "./TodoItem"

export function TodoList({ todos, onDeleteTodo }) {
    return ul()
        .listStyleType("none")
        .padding(0)
        .children(
            ...todos.map((todo, index) =>
                TodoItem({ todo, onDelete: () => onDeleteTodo(index) })
            )
        )
}
