import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function cartPage(){

    const[result, setResult] = useState([]);

    useEffect(() => {
        axios.get("/books/purchaseItems")
        .then(response => setResult(response.data))
        .error(error => console.error(error))
    })

    const handleFinishPurchase =() => {
        axios.post("/books/completeCartPurchase")
        .then(response => "Purchase approved, heading to payment portal....")
        .error(error => console.error(error))
    }

    return(
        <>
            <div>
                <h1>Your Cart</h1>
                <p>The books you added to the cart will be displayed here, finish the purchase!</p>
                <div>
                    <ul>
                        {result.map(book => {
                            <li key={book.id}>
                                <h3>{book.title}</h3>
                                <p>{book.author} - ${book.price}</p>
                            </li>
                        })}
                    </ul>
                </div>
                <div>
                    <button onClick={handleFinishPurchase}>Complete Purchase</button>
                </div>
            </div>
        </>
    )
}