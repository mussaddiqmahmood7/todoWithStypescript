import React from 'react';
import './search.css';

interface search{
    find:string;
    toFind:React.Dispatch<React.SetStateAction<string>>
}

const Search=({find, toFind}:search )=>{
 
    function searchSubmit(event:React.FormEvent){
     event.preventDefault();
     toFind(find);
    }
    return<>
        <form className="inputSection" onSubmit={searchSubmit}>
          <input placeholder="Search Task" value={find} onChange={(event)=>{toFind(event.target.value)}}/>
          <button type="submit">Search</button>
        </form>
    </>
}

export default Search