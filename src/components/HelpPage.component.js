import React, { Component } from 'react';
import firebase from 'firebase/app'

export default class HelpPage extends Component {
    render() {
        return (
            <div className="container">
                <br />
                <h1 className="text-center">Welcome to our online Book Store & Rental platform</h1>
                <br />
                <h2>General questions</h2>
                <br />
                <h3>What does this platform does?</h3>
                <p>We provide our users to read books online, rent books from other users and give your old books for rent and earn money.</p>
                <h3>Can I use this platform without signing-in?</h3>
                <p>You can search books and read online without login. For other features you need to log in using Google/Signup. </p>
                <h3>How I can post my books for rent?</h3>
                <p>After Signup, go to <a target="_blank" href="http://localhost:3000/myBooks">MY BOOKS</a> and add you books to give it for rent.</p>
                <h3>How can I rent books?</h3>
                <p>After Signup/Signin, go to <a target="_blank" href="http://localhost:3000/rentalList">RENTAL PLATFORM</a> and click on 'Rent' to rent it. If the book is already rented, it will show the status as 'NOT AVAILABLE'.</p>
                <h3>What is Chat Room?</h3>
                <p>After login, when you have this CHAT ROOM open, you can chat with other users available in the Chat room to ask questions like if they have some particular book available, etc. Please note that we don't save your chat history, so when you leave this chat room, all the information will be lost.</p>
            </div >
        )
    }
}
