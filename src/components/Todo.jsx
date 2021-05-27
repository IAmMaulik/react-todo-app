import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Modal,
} from "@material-ui/core";
import React, { useState } from "react";
import db from "../firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import EditIcon from "@material-ui/icons/Edit";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const Todo = (props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const classes = useStyles();

  const updateItem = (e) => {
    e.preventDefault();
    db.collection("todos").doc(props.text.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
  };

  return (
    <>
      <Modal
        style={{ alignItems: "center", justifyContent: "center" }}
        open={open}
        onClose={(e) => setOpen(false)}
      >
        <div className={classes.paper}>
          <form>
            <h1>Edit Item</h1>
            <input
              placeholder={props.text.todo}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <ThemeProvider theme={theme}>
              <Button
                onClick={updateItem}
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<UpdateIcon />}
              >
                Update
              </Button>
            </ThemeProvider>
          </form>
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
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={(e) => setOpen(true)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={(event) => {
            db.collection("todos").doc(props.text.id).delete();
          }}
        >
          Delete
        </Button>
      </List>
    </>
  );
};

export default Todo;
