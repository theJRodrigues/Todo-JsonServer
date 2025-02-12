import axios from "axios";
import { useEffect, useState } from "react";

function GetToDo() {
  const [data, setData] = useState({});
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3000/todos");
      setData(response.data);
    };
    getData();
  }, []);

  return data;
}

export default GetToDo;
