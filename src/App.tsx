import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [tarefas, setTarefas] = useState([]);
  const [postTarefa, setPostTarefa] = useState("");
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3000/todos");
      setTarefas(response.data);
    };
    getData();
  }, []);

 const handleSubmit = async (e) => {
    e.preventDefault();
     await axios.post("http://localhost:3000/todos", {
      tarefa: postTarefa,
    });
    const response = await axios.get("http://localhost:3000/todos");
    setTarefas(response.data);
    setPostTarefa("")
   };
   
   const handleClick = async (id) => {
      await axios.delete("http://localhost:3000/todos/" + id)
      const response = await axios.get("http://localhost:3000/todos");
      setTarefas(response.data);
   }



  return (
    <div className="w-35 bg-indigo-950 text-white rounded-2xl p-4">
      <h1 className="text-center">TODO</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Insira a tarefa:
          <input type="text" value={postTarefa} onChange={(e) => setPostTarefa(e.target.value)} />
        </label>
        <button type="submit">Enviar</button>
      </form>

      <ul>
        {tarefas && tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <span>{tarefa.tarefa}</span>
              <button onClick={() => handleClick(tarefa.id)}>X</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
