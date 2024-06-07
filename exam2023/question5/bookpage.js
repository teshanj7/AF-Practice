import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios';

export default function BookPage(){
    const {id} = useParams();
    const [book, setBook] = useState('');

    useEffect(() =>{
        axios.get(`/books/${id}`)
        .then(response => setBook(response.data))
        .catch(error => console.error("Error fetching the book: " , error))
    })

    const handlePurchase = () => {
        axios.post(`books/purchase/${id}`)
        .then(response => alert('Purchase approved, now heading to payment!'))
        .catch(error=> console.error("Purchase error: ", error))
    }

    return(
        <>
            <div>
                <h1>{book.title}</h1>
                <p>{book.author}</p>
                <p>{book.price}</p>
                <p>{book.availability}</p>
                <button onClick={handlePurchase}>Purchase Book</button>
            </div>
        </>
    )
}