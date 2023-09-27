import React from "react";
import "./search.css";
interface Todo {
  id: number;
  todo: string;
  status: string | "todo" | "completed" | "pending" | "deleted";
  update: boolean;
}

interface search {
  find: string;
  toFind: React.Dispatch<React.SetStateAction<string>>;
  all: Todo[];
}

const Search = ({ find, toFind, all }: search) => {
  all.map((e) => {
    if (e.update == true) {
      e.update = false;
    }
  });

  function searchSubmit(event: React.FormEvent) {
    event.preventDefault();
    toFind(find);
  }
  return (
    <>
      <form className="inputSection" onSubmit={searchSubmit}>
        <input
          placeholder="Search Task"
          value={find}
          onChange={(event) => {
            toFind(event.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
