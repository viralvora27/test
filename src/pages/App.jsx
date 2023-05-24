import React from "react";
import AddTodo from "./AddToDo";
import ListTodo from "./ListTodo";
import Topbar from "../components/Topbar";
import { Heading } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Heading size="md" textAlign="center">
          My Todos
        </Heading>
        <AddTodo />
        <ListTodo />
      </div>
    </>
  );
}

export default App;
