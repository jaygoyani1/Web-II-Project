import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from "react-router-dom";
import firebase from 'firebase/app';


let bid = ''
let u = ''
export default class Addbook extends Component {
    constructor(props) {
        super(props);

        this.onChangeBookDescription = this.onChangeBookDescription.bind(this);
        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.onChangeAvailablity = this.onChangeAvailablity.bind(this);
        this.onChangeRentalPrice = this.onChangeRentalPrice.bind(this);
        this.onChangeOwnerID = this.onChangeOwnerID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            book_name: '',
            book_description: '',
            rental_price: 1,
            owner_id: '',
            availablity: true,
            book_id: ''
        }
    }

    onChangeBookName(e) {
        this.setState({
            book_name: e.target.value
        });
    }

    onChangeBookDescription(e) {
        this.setState({
            book_description: e.target.value
        });
    }

    onChangeAvailablity(e) {
        this.setState({
            availablity: e.target.value
        });
    }

    onChangeRentalPrice(e) {
        this.setState({
            rental_price: e.target.value
        });
    }

    onChangeOwnerID(e) {
        this.setState({
            owner_id: e.target.value
        });
    }



    async onSubmit(e) {
        e.preventDefault();
        try {
            let bookName, bookDescription;
            if (this.state.book_name.trim() != '') {
                bookName = this.state.book_name.trim();
            } else {
                throw "Enter proper book name";
            }
            if (this.state.book_description.trim() != '' && isNaN(this.state.book_description.trim())) {
                bookDescription = this.state.book_description.trim();
            } else {
                throw "Enter proper book description";
            }
            const newBook = {
                book_name: bookName,
                book_description: bookDescription,
                availablity: this.state.availablity,
                rental_price: this.state.rental_price,
                owner_id: firebase.auth().currentUser.uid
            };

            await axios.post('http://localhost:4000/mybook/add', newBook)
                .then(res => {
                    bid = res.data.mybook._id;
                })


            const obj = {
                book_id: bid
            };

            u = firebase.auth().currentUser.uid
            await axios.post('http://localhost:4000/user/SI/' + u, obj)

            this.props.history.push('/myBooks');

            this.setState({
                book_name: '',
                book_description: '',
                rental_price: 1,
                owner_id: '',
                availablity: true
            })
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <br></br>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <label className="col">Book Name: </label>
                            <input type="text" required
                                className="form-control col"
                                minLength="1"
                                maxLength="50"
                                value={this.state.book_name}
                                onChange={this.onChangeBookName}
                            />
                        </div>

                        <div className="form-group row">
                            <label className="col">Book Description: </label>
                            <input
                                type="text" required
                                minLength="10"
                                maxLength="150"
                                className="form-control col"
                                value={this.state.book_description}
                                onChange={this.onChangeBookDescription}
                            />
                        </div>

                        <div className="form-group row">
                            <label className="col">Rental Price: </label>
                            <input
                                type="number" required
                                className="form-control col"
                                value={this.state.rental_price}
                                onChange={this.onChangeRentalPrice}
                            />
                        </div>

                        <br></br>

                        <div className="form-group">
                            <input type="submit" value="Create Book" className="btn btn-primary float-right" />
                        </div>
                    </form>


                </div>

            </Router>
        )
    }
}
