import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";

const Todo = (props) => {
  return (
    <List>
      <ListItem>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText primary={props.text} secondary="Dummy Deadline ⏰" />
      </ListItem>
    </List>
  );
};

export default Todo;
