import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../css/App.css";
import Todo from "./Todo";
import db from "../firebase";
import firebase from "firebase/app";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addItem = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="App">
      <h1>To-Do List Website</h1>
      <form>
        <FormControl>
          <InputLabel>Write a To-Do Item</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addItem}
          variant="contained"
          color="primary"
        >
          Add To-Do Item
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
