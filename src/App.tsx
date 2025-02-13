import { useEffect, useState } from "react";
import api from "./services/Api";


interface ToDos {
  id: string,
  todo: string
}


const App = () => {
  const [postToDo, setPostToDo] = useState("");
  const [todos, setTodos] = useState<ToDos[]>([]);

  const getData  = async () => {
    const response  = await api.get("/todos");
    setTodos(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api.post("/todos", {
      todo: postToDo,
    });
    setPostToDo("")
    getData();
  };

  const handleDelete = async (id: string) =>{
    await api.delete("/todos/" + id)
    getData();
  }

  return (
    <div className="w-35 bg-indigo-950 text-white rounded-2xl p-4">
      <h1 className="text-center">TODO</h1>
      <form onSubmit={handlePost}>
        <label>
          Insira a tarefa:
          <input
            type="text"
            value={postToDo}
            onChange={(e) => setPostToDo(e.target.value)}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>

      <ul>
        {todos &&
          todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.todo}</span>
              <button onClick={() => handleDelete(todo.id)}>X</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
