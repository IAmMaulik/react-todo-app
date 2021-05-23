import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import React, { useState } from "react";
import "../App.css";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState([
    "Take dog for a walk",
    "Buy groceries",
    "another element",
  ]);
  const [input, setInput] = useState("");

  const addItem = (event) => {
    event.preventDefault();
    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>This is a heading!</h1>
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
          Add Todo
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
