import React, { Component, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import bookcover from '../book-cover.jpg'
import ButtonR from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import firebase from 'firebase/app'
import { FaBookOpen } from "react-icons/fa";

function Book(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function refreshPage() {
        window.location.reload();
    }

    return (
        <div>
            <Card style={{ width: '20rem', height: '24rem' }} className="text-center">
                <Card.Body>
                    <Card.Title as="h3" className="container text-center" >{props.mybook.book_name}</Card.Title>
                    {props.mybook.book_description}
                    <br />
                    <br />
                    RENTAL PRICE:<div className="text-primary">${props.mybook.rental_price}</div> <br></br>
                        AVAILABILITY :{props.mybook.availablity ? <p className="text-success">Available for rent</p> : <p className="text-danger">Rented</p>}
                </Card.Body>
                <Card.Footer>
                    <Button text="secondary" onClick={refreshPage} href={"/editBook/" + props.mybook._id}>
                        {/* <Link to={"/editBook/" + props.mybook._id}>Edit</Link> */}
                        Edit
                    </Button>
                </Card.Footer>
            </Card>
            <br></br>

        </div>
    )
}



export default class MyBooks extends Component {
    state = { show: false };

    constructor(props) {
        super(props);
        this.state = {
            mybook: []

        };
    }

    async componentDidMount() {
        await axios.get('http://localhost:4000/mybook/')
            .then(response => {
                this.setState({ mybook: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    mybookList() {
        return this.state.mybook.map(function (currentMybook, i) {
            let u = firebase.auth().currentUser.uid
            if (u === currentMybook.owner_id) {
                return <Book mybook={currentMybook} key={i} />;
            }


        })
    }


    render() {
        return (
            <Router>
                <div>
                    <div className="container text-center">
                        <br />
                        <h1 className="text-center">MY BOOKS COLLECTION</h1>
                        <h2 className="text-center"> List of all the books from my collections available for rent </h2>
                        <Button className="btn success" href="/Addbook">
                            <FaBookOpen /> ADD BOOK TO MY COLLECTION </Button>
                        <hr></hr>

                        <CardDeck>
                            {this.mybookList()}

                        </CardDeck>

                    </div>
                </div>
            </Router>
        )
    }
}