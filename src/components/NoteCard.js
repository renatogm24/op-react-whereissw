import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar, CardMedia, IconButton, makeStyles } from "@material-ui/core";
import PlayCircleFilledOutlined from "@material-ui/icons/PlayCircleFilledOutlined";
import { blue, green, pink, yellow } from "@material-ui/core/colors";
import image1 from "../images/image1.jpg";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === "work") {
        return yellow[700];
      }
      if (note.category === "money") {
        return green[500];
      }
      if (note.category === "todos") {
        return pink[500];
      }
      return blue[500];
    },
  },
});

export default function NoteCard({ note, handleDelete }) {
  const history = useHistory();
  const classes = useStyles(note);
  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              onClick={() => history.push(`/op-react-whereissw/${note.id}`)}
            >
              <PlayCircleFilledOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={image1}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography nowrap variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
