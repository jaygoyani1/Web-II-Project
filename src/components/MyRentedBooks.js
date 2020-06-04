import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';

const MyRentedBooks = () => {
    let table = null;
    let userId = null;
    const [rentedBookList, setRentedBookList] = useState([]);

    useEffect(() => {
        async function fetchBooks() {
            userId = firebase.auth().currentUser.uid
            let user;
            await axios.get('http://localhost:4000/user/SI/' + userId)
                .then(async userData => {
                    let rentedBooks = []
                    user = (userData.data);
                    for (let i = 0; i < user.rented.length; i++) {
                        await axios.get('http://localhost:4000/mybook/' + user.rented[i])
                            .then(async response => {
                                await axios.get('http://localhost:4000/user/SI/' + response.data.owner_id)
                                    .then(userInfo => {
                                        const book = {
                                            book_name: response.data.book_name,
                                            phone_number: userInfo.data.phone_number||" ",
                                            owner: userInfo.data.first_name,
                                            email: userInfo.data.email
                                        }
                                        rentedBooks.push(book);
                                    })
                            })
                    }
                    setRentedBookList(rentedBooks);
                })
        }
        fetchBooks();
    }, [userId])

    if (rentedBookList.length > 0) {
        table = <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th className="text-center">BOOK ISSUED</th>
                    <th className="text-center">BOOK OWNER</th>
                    <th className="text-center">OWNER PHONE NUMBER</th>
                    <th className="text-center">OWNER EMAIL</th>
                </tr>
            </thead>
            <tbody>
                {rentedBookList.map(book => (
                    <tr key={book.book_name}>
                        <td className="text-center">{book.book_name}</td>
                        <td className="text-center">{book.owner}</td>
                        <td className="text-center">{book.phone_number}</td>
                        <td className="text-center">{book.email}</td>
                    </tr >
                ))
                }
            </tbody></table>
        return (
            <div className='book-view'>
                {table}
            </div>
        );
    } else {
        return (
            <div className='book-view container'>
                <h2 className="text-center">YOU HAVEN'T RENTED ANY BOOKS</h2>
            </div>
        );
    }


}

export default MyRentedBooks;