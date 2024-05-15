import React from "react";
import { ListItem, ListItemText } from "@mui/material";

interface BookProps {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publisher: string;
  year: number;
  copies: number;
}

const Book: React.FC<BookProps> = ({
  title,
  author,
  genre,
  isbn,
  publisher,
  year,
  copies,
}) => {
  return (
    <ListItem>
      <ListItemText
        primary={title}
        secondary={
          <React.Fragment>
            <p>Author: {author}</p>
            <p>Genre: {genre}</p>
            <p>ISBN: {isbn}</p>
            <p>Publisher: {publisher}</p>
            <p>Year: {year}</p>
            <p>Copies: {copies}</p>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default Book;
