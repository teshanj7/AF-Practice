import React, {useState} from 'react';
import axios from 'axios';

export default function searchPage(){
    const[search, setSearch] = useState('');
    const[result, setResults] = useState([]);

    const handleSearch = () => {
        axios.get(`books/search?q=${search}`)
        .then(response => setResults(response.data))
        .catch(error => console.error('Error searching books: ', error))
    };

    return(
        <>
        <div>
            <h1>Search for Books</h1>
            <p>You can search for books that you need!</p>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
            <button type='submit' onClick={handleSearch}>Search</button>

            <h2>Your Search Results</h2>
            <div>
                <ul>
                    {result.map(book => (
                        <li key={book.id}>
                            <h2>{book.title}</h2>
                            <h3>{book.author} - ${book.price}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )

}