import AppBar from "./Layout";
import TodoPage from "./TodoPage";
import { useEffect, useState } from 'react';
import { getTodos } from "ApiService/ApiService";

export const App = () => {
  const [data, setData] = useState([]);

  const handleRequest = () => {
    getTodos().then(({ data }) => {
      setData(data.tasks);
    });
  }

  useEffect(() => {
    handleRequest();
  }, []);

  return (
    <>
    <AppBar />
    <TodoPage data={data} reqFunc={handleRequest}/>
    </>
  )
};
