import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import { FaSave } from "react-icons/fa";

export default class ProfileUpdate extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            first_name: '',
            last_name: '',
            phone_number: 'XXX-XXX-XXXX'
        }
    }

    async componentDidMount() {

        await axios.get('http://localhost:4000/user/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    phone_number: response.data.phone_number

                })
            })
            .catch(function (error) {
                console.log(error);
            })
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

    onChangePhoneNumber(e) {
        this.setState({
            phone_number: e.target.value
        });
    }

    async onSubmit(e) {
        e.preventDefault();
        try {
            let firstName, lastName;
            if (this.state.first_name.trim() != '' && isNaN(this.state.first_name.trim())) {
                firstName = this.state.first_name.trim();
            } else {
                throw "Enter proper first name";
            }
            if (this.state.last_name.trim() != '' && isNaN(this.state.last_name.trim())) {
                lastName = this.state.last_name.trim();
            } else {
                throw "Enter proper last name";
            }
            const obj = {
                first_name: firstName,
                last_name: lastName,
                phone_number: this.state.phone_number,
            };

            await axios.patch('http://localhost:4000/user/update/' + this.props.match.params.id, obj)
                // .then(res => console.log(res.data));

            this.props.history.push('/ProfilePage');
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <div>
                <br />
                <div>
                    <h3 align="center">UPDATE PROFILE</h3>
                    <hr />
                    <br />
                    <Container>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">FIRST NAME </label>
                                <input type="text"
                                    required
                                    className="form-control col"
                                    value={this.state.first_name}
                                    onChange={this.onChangeFirstName}
                                />
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">LAST NAME </label>
                                <input
                                    type="text"
                                    required
                                    className="form-control col"
                                    value={this.state.last_name}
                                    onChange={this.onChangeLastName}
                                />

                            </div>

                            <div className="form-group row">

                                <label className="col-sm-2 col-form-label col-form-label-sm">PHONE NUMBER </label>

                                <input
                                    required
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    placeholder="XXX-XXX-XXXX"
                                    className="form-control col"
                                    value={this.state.phone_number}
                                    onChange={this.onChangePhoneNumber}
                                />

                            </div>


                            <br />

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary float-right"> <FaSave /> UPDATE PROFILE</button>

                            </div>
                            <div>
                            </div>
                        </form>
                    </Container>
                </div>
            </div>
        )

    }
}
