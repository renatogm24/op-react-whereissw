import React, { useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import image1 from "../images/image1.jpg";
import Marker from "../components/Marker";
export default function Game({
  open,
  setTimerIsRunning,
  setPlayerName,
  playerName,
  time,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [chars, setChars] = useState([
    { id: "1", name: "Maz Kanata", found: false },
    { id: "2", name: "Han Solo", found: false },
    { id: "3", name: "Crimson Corsair", found: false },
    { id: "4", name: "Grummgar", found: false },
    { id: "5", name: "Bazine Netal", found: false },
    { id: "6", name: "Emmie", found: false },
  ]);
  const [charsLeft, setCharsLeft] = useState(chars);
  const [clicked, setClicked] = useState(null);
  const [form, setForm] = useState(true);

  const closeForm = () => {
    if (playerName) {
      setForm(false);
      setTimeout(() => {
        setTimerIsRunning(true);
      }, 1000);
    }
  };
  const validateTextField = (e) => {
    if (
      e.target.value.trim() !== "" &&
      e.target.value !== null &&
      e.target.value.trim().length < 32
    ) {
      setPlayerName(e.target.value.trim());
    } else {
      setPlayerName(null);
    }
  };
  const keyPress = (e) => {
    if (e.key === "Enter") {
      closeForm();
    }
  };
  const openMenu = (event) => {
    // Create selection div
    const selectionDiv = document.createElement("div");
    selectionDiv.setAttribute("id", "selection-div");
    selectionDiv.style.position = "absolute";
    selectionDiv.style.left = event.pageX - 50 + "px";
    selectionDiv.style.top = event.pageY - 50 + "px";
    selectionDiv.style.width = "100px";
    selectionDiv.style.height = "100px";
    selectionDiv.style.border = "3px dashed #000";
    selectionDiv.style.borderRadius = "50%";
    document.body.append(selectionDiv);
    setAnchorEl(selectionDiv);

    if (event.target.id) {
      setClicked(event.target.id);
    }
  };
  const closeMenu = (event) => {
    if (event.target.dataset.id === clicked) {
      setCharsLeft(
        charsLeft.filter((char) => char.id !== event.target.dataset.id)
      );
      setChars(
        chars.map((char) => {
          if (char.id === event.target.dataset.id) {
            char.found = true;
          }
          return char;
        })
      );
    }
    if (chars.every((char) => char.found)) {
      setTimerIsRunning(false);
      setOpenDialog(true);

      //alert("You win");
    }
    // Delete selection div
    const selectionDiv = document.getElementById("selection-div");
    selectionDiv.parentNode.removeChild(selectionDiv);
    setAnchorEl(null);
  };
  const closeDialog = () => {
    setOpenDialog(false);
    document.location.reload();
  };
  return (
    <div>
      {chars.map((char) => {
        return <Marker key={char.id} char={char} open={open} />;
      })}

      <img
        aria-controls="simple-menu"
        onClick={openMenu}
        src={image1}
        alt="Raid Three"
        useMap="#image-map"
      />

      <map name="image-map">
        <area
          id="1"
          onClick={openMenu}
          alt="Maz Kanata"
          title="Maz Kanata"
          coords="686,11,983,260"
          shape="rect"
          color="red"
        />
        <area
          id="2"
          onClick={openMenu}
          alt="Han Solo"
          title="Han Solo"
          coords="218,1179,139,1262"
          shape="rect"
        />
        <area
          id="3"
          onClick={openMenu}
          alt="Crimson Corsair"
          title="Crimson Corsair"
          coords="2342,1642,2419,1699"
          shape="rect"
        />
        <area
          id="4"
          onClick={openMenu}
          alt="Grummgar"
          title="Grummgar"
          coords="944,765,1026,819"
          shape="rect"
        />
        <area
          id="5"
          onClick={openMenu}
          alt="Bazine"
          title="Bazine"
          coords="1035,783,1098,853"
          shape="rect"
        />
        <area
          id="6"
          onClick={openMenu}
          alt="Emmie"
          title="Emmie"
          coords="1476,285,1557,373"
          shape="rect"
        />
      </map>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        getContentAnchorEl={null}
      >
        {charsLeft.map((char) => (
          <MenuItem data-id={char.id} key={char.id} onClick={closeMenu}>
            {char.name}
          </MenuItem>
        ))}
      </Menu>
      <Dialog
        open={form}
        onClose={closeForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Welcome!</DialogTitle>
        <DialogContent style={{ minWidth: 250 }}>
          <DialogContentText>
            Please enter your name here to start.
          </DialogContentText>
          <TextField
            onChange={validateTextField}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            required
            autoComplete="off"
            helperText="Name is required to save scores."
            onKeyUp={keyPress}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeForm}
            color="primary"
            disabled={playerName === null}
          >
            Play
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Congratulations!</DialogTitle>
        <DialogContent style={{ minWidth: 550 }}>
          <DialogContentText>
            {"You found all targets in "}
            <strong>{time}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => document.location.reload()} color="primary">
            Play Again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
