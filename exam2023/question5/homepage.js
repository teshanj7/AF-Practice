import React, {useEffect,useState} from 'react';
import axios from 'axios';

export default function HomePage(){
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        axios.get('/books')
        .then(response=>setBooks(response.data))
        .catch(error => console.error('Error getting the books', error));
    }, [])

    return(
        <>
            <div>
                <h1>Online Book Store</h1>
                <h2>See all kinds of books and purchase for your reading needs!</h2>
                <p>sfhgsgvrgbjobnoenboejboejboeobjeobjeobeobjeobonbonbnbnbvfnvofsnvonsfovns</p>

                <div>
                    <ul>
                        {books.map( book => (
                            <li key={book.id}>
                                <div>
                                    <h2>{book.title}</h2>
                                    <h3>{book.author} - ${book.price}</h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}