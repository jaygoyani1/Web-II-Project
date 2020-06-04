import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";

export default class AddUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhNUmber = this.onChangePhNUmber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            special_id: '',
            phone_number: '',
            profile_pic: '',
            book_available: [],
            rented: []
        }
    }

    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }



    onChangePhNUmber(e) {
        this.setState({
            phone_number: e.target.value
        });
    }



    async onSubmit(e) {
        e.preventDefault();
        try {
            let firstName, lastName;
            if (this.state.first_name.trim() != '') {
                firstName = this.state.first_name.trim();
            } else {
                throw "Enter proper first name";
            }
            if (this.state.last_name.trim() != '') {
                lastName = this.state.last_name.trim();
            } else {
                throw "Enter proper last name";
            }

            const newUser = {
                first_name: firstName,
                last_name: lastName,
                email: firebase.auth().currentUser.email,
                special_id: firebase.auth().currentUser.uid,
                phone_number: this.state.phone_number,
                book_available: [],
                rented: [],
                profile_pic: ''
            };
            await axios.post('http://localhost:4000/user', newUser)
                // .then(res => console.log(res.data));

            this.props.history.push('/profilePage');

            this.setState({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                book_available: [],
                rented: [],
                profile_pic: ''
            })
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <br></br>
                    <h2 className="text-center"> ENTER YOU DETAILS</h2>
                    <hr />
                    <br></br>
                    <form onSubmit={this.onSubmit} className="container">
                        <div className="form-group row">
                            <label className="col">FIRST NAME </label>
                            <input type="text" required
                                pattern="[A-Za-z]{1,25}"

                                className="form-control col"
                                value={this.state.first_name}
                                onChange={this.onChangeFirstName}
                            />
                        </div>

                        <div className="form-group row">
                            <label className="col">LAST NAME</label>
                            <input
                                type="text"
                                required
                                pattern="[A-Za-z]{1,25}"
                                className="form-control col"
                                value={this.state.last_name}
                                onChange={this.onChangeLastName}
                            />
                        </div>



                        <div className="form-group row">
                            <label className="col">PHONE NUMBER </label>
                            <input
                                required
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                placeholder="XXX-XXX-XXXX"
                                className="form-control col"
                                value={this.state.phnumber}
                                onChange={this.onChangePhNUmber}
                            />
                        </div>

                        <br></br>

                        <div className="form-group">
                            <button id='submitButton' name='submitButton' type='submit' className="btn btn-primary float-right container">
                                <FaPlusSquare /> CREATE USER
				</button>

                        </div>
                    </form>


                </div>

            </Router>
        )
    }
}
