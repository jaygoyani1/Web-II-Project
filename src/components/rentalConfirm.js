import React, { Component } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import firebase from 'firebase/app'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import bookcover from '../images/bookcover.png'
import Img from '../images/NoProfileImage.jpg'

let bookid = ''
let buyerid = ''
let oid = ''
function User(props) {
    let checkImage = null
    if (props.alluser.profile_pic === '') {
        checkImage = Img
    } else {
        checkImage = props.alluser.profile_pic
    }
    return (
        <Row>
            <Col>
                <div>
                    <h2 className="text-center">OWNER</h2>
                    <div className="container">
                        <Container className="text-center" >
                            <Card style={{ width: '30rem', height: '30rem' }} className="container table-info">
                                <div className="text-center">
                                    <Card.Img variant="top" alt="photo" src={checkImage} />
                                    <Card.Body>
                                        <Card.Title>NAME : {props.alluser.first_name} {props.alluser.last_name}</Card.Title>
                                        <Card.Title>EMAIL : {props.alluser.email}</Card.Title>
                                        <Card.Title>PHONE : {props.alluser.phone_number}</Card.Title>
                                    </Card.Body>
                                </div>
                            </Card>
                        </Container>
                    </div>
                </div>
            </Col>
        </Row>
    )
}


export default class rentalConfirm extends Component {

    constructor(props) {
        super(props);
        this.changeAvailablity = this.changeAvailablity.bind(this);
        this.state = {
            book_id: '',
            buyer_id: '',
            mybook: {},
            alluser: []
        };
    }

    async componentDidMount() {
        bookid = this.props.match.params.bid
        buyerid = this.props.match.params.sid
        await axios.get('http://localhost:4000/mybook/' + bookid)
            .then(response => {
                this.setState({ mybook: response.data });
                oid = this.state.mybook.owner_id
            })
            .catch(function (error) {
                console.log(error);
            })

        await axios.get('http://localhost:4000/user/')
            .then(response => {
                this.setState({ alluser: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    mybookList() {
        return this.state.alluser.map(function (currentMyUser, i) {
            if (oid == currentMyUser.special_id) {
                return <User alluser={currentMyUser} key={i} />;
            }
        })
    }

    async changeAvailablity(e) {
        e.preventDefault();
        alert("Sucessfully booked! Find owner's details in 'RENTED BOOKS' Page.")

        const obj = {
            book_name: this.state.mybook.book_name,
            book_description: this.state.mybook.book_description,
            rental_price: this.state.mybook.rental_price,
            owner_id: this.state.mybook.owner_id,
            availablity: false
        }

        await axios.post('http://localhost:4000/mybook/update/' + bookid, obj)
            .catch(function (error) {
                console.log(error);
            })
        const objNew = {
            book_id: bookid
        };

        let u = firebase.auth().currentUser.uid
        await axios.post('http://localhost:4000/user/SI/addrented/' + u, objNew)
            // .then(res => console.log(res.data))

        this.props.history.push('/rentalList');
    }

    render() {

        return (

            <div>
                <br />
                <h1 className="text-center">CONFIRM YOUR RENTAL</h1>
                <Row>
                    <Col>
                        <br />
                        <hr />
                        <div className="text-center">
                            <h2>BOOK DETAILS</h2>

                            <div className="container">
                                <Container className="text-center" >
                                    <Card style={{ width: '30rem', height: '30rem' }} className="container table-info">
                                        <div className="text-center">
                                            <Card.Img variant="top" alt="photo" src={bookcover} />
                                            <Card.Body>
                                                <Card.Title>BOOK NAME : {this.state.mybook.book_name}</Card.Title>
                                                <Card.Title>DESCRIPTION : {this.state.mybook.book_description}</Card.Title>
                                                <Card.Title>RENTAL PRICE : {this.state.mybook.rental_price}</Card.Title>
                                            </Card.Body>
                                        </div>
                                    </Card>
                                </Container>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <br />
                        <hr />
                        {this.mybookList()}
                        <br />
                    </Col>
                </Row>
                <hr />
                <div className="row">

                    <div className="col text-right">
                        <Button className="btn btn-danger" href="/rentalList"> CANCEL </Button>
                    </div>

                    <div className="col text-left">
                        <Button className="btn btn-success " onClick={this.changeAvailablity}>CONFIRM</Button>
                    </div>
                    <hr />
                    <br />
                </div>
                <br />
                <br />
                <br />
            </div>
        )
    }
}