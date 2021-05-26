import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@material-ui/core";
import React, { useState } from "react";
import db from "../firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";


const Todo = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div>
          <h1>I am a modal</h1>
          <button onClick={(e) => setOpen(false)}>Save</button>
        </div>
      </Modal>
      <List>
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText
            primary={props.text.todo}
            secondary="Dummy Deadline ⏰"
          />
        </ListItem>
        <button onClick={(e) => setOpen(true)}>Edit</button>
        <DeleteForeverIcon
          onClick={(event) => {
            db.collection("todos").doc(props.text.id).delete();
          }}
        />
      </List>
    </>
  );
};

export default Todo;
