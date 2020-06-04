import React, { useEffect } from 'react';
import '../App.js';
import io from 'socket.io-client'
import axios from 'axios';
import firebase from 'firebase/app';
import noImage from '../images/NoProfileImage.jpg';
import downloadImage from '../images/download.jpg';
import jsPDF from 'jspdf'

let chatHistory = []

let dateNow = () => {
    var currentdate = new Date();
    var datetime = (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime
}

let socket = io('http://localhost:3001')

let pdfGenerate = () => {
    var doc = new jsPDF('p', 'pt');
    doc.text(20, 20, 'CHAT HISTORY \n\n');
    doc.setFont('courier');
    let offset = 40
    for (let i = 0; i < chatHistory.length; i++) {
        doc.text(20, offset + (20 * i), chatHistory[i]);
    }
    var d = dateNow().replace(":", "_").replace(" ", "_");
    let filename = "Chat_history_" + d + ".pdf"
    doc.save(filename)
}

export let loggedInUser;


const ChatRoom = () => {
    useEffect(() => {
        async function chat() {
            const userId = firebase.auth().currentUser.uid
            await axios.get('http://localhost:4000/user/SI/' + userId)
                .then(async userData => {
                    loggedInUser = userData.data;
                })
            const form = document.querySelector("form");
            const input = document.querySelector(".input");
            const messages = document.querySelector(".chat-messages");
            let username = '';
            if (loggedInUser.first_name) {
                username = loggedInUser.first_name;
            }
            if (loggedInUser.last_name) {
                username = username + " " + loggedInUser.last_name;
            }
            let image;
            if (loggedInUser.profile_pic == "") {
                image = "<img src=" + noImage + "></img>";
            } else {
                image = "<img src=" + loggedInUser.profile_pic + "></img>"
            }

            form.addEventListener("submit", function (event) {
                event.preventDefault();
                addMessage(image + "Me: " + input.value);
                var d = dateNow()
                chatHistory.push(d + " Me" + " : " + input.value + " \n")
                socket.emit("chat_message", {
                    image: image,
                    message: input.value
                });

                input.value = "";
                return false;
            }, false);

            socket.on("chat_message", function (data) {
                addMessage(data.image + "  " + data.username + ": " + data.message);
                var d = dateNow()
                chatHistory.push(d + " " + data.username + " : " + data.message + " \n")
            });

            socket.emit("user_join", username);

            function addMessage(message) {
                const li = document.createElement("li");
                li.innerHTML = message;
                messages.appendChild(li);
                window.scrollTo(0, document.body.scrollHeight);
            }
        }
        chat();
    }, [])

    return (
        <div className='App-body'>
            < script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js" ></script >
            <ul className="chat-messages"></ul>
            <form className="chat-form">
                <label className="heading" for="my-input">
                    Type: 
            </label>
                <input type="text" id="my-input" className="input" autoComplete="off" autoFocus />   <button>Send</button>
                <img src={downloadImage} title="Download chat history" className="chat-download-img" onClick={pdfGenerate}></img>
            </form>
        </div>
    );
}

export default ChatRoom;