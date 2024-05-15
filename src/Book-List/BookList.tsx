import React from "react";
import { List } from "@mui/material";
import Book from "./Book";
import "./Book-view.css";

interface BookData {
  title: string;
  author: string;
  genre: string;
  isbn: string; // Opcjonalne właściwości
  publisher: string;
  year: number;
  copies: number;
}

interface BookListProps {
  books: BookData[];
}

function BookList({ books }: BookListProps) {
  return (
    <div className="b-Book-list">
      <List>
        {books.map((book, index) => (
          <Book key={index} {...book} />
        ))}
      </List>
    </div>
  );
}

export default BookList;
