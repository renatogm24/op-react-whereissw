import React from "react";
import { Container } from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";

export default function Notes({ notes }) {
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <motion.div
            item
            key={note.id}
            whileHover={{ scale: 1.1, originX: 0 }}
            transition={{ type: "spring", stiffness: 1000 }}
          >
            <NoteCard note={note} />
          </motion.div>
        ))}
      </Masonry>
    </Container>
  );
}
