import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import Container from 'react-bootstrap/Container'
export default class EditBookInfo extends Component {

    constructor(props) {
        super(props);

        this.onChangeBookDescription = this.onChangeBookDescription.bind(this);
        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.onChangeAvailablity = this.onChangeAvailablity.bind(this);
        this.onChangeRentalPrice = this.onChangeRentalPrice.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAvaible = this.onChangeAvaible.bind(this);

        this.state = {
            book_name: '',
            book_description: '',
            rental_price: 1,
            owner_id: '',
            availablity: true
        }
    }

    async componentDidMount() {
        await axios.get('http://localhost:4000/mybook/' + this.props.match.params.id)
            .then(response => {
                this.setState({

                    book_name: response.data.book_name,
                    book_description: response.data.book_description,
                    availablity: response.data.availablity,
                    rental_price: response.data.rental_price,
                    owner_id: response.data.owner_id

                })
            })
            .catch(function (error) {
                console.log(error);
            })
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


    async onDelete(e) {
        e.preventDefault();
        await axios.delete('http://localhost:4000/mybook/' + this.props.match.params.id)

        const obj = {
            book_id: this.props.match.params.id
        }
        let u = firebase.auth().currentUser.uid
        await axios.post('http://localhost:4000/user/SI/' + u + '/del', obj)
        this.props.history.push('/myBooks');
    }

    async onChangeAvaible(e) {
        e.preventDefault();
        let bookid = this.props.match.params.id
        const obj = {
            book_name: this.state.book_name,
            book_description: this.state.book_description,
            rental_price: this.state.rental_price,
            owner_id: this.state.owner_id,
            availablity: true
        }

        await axios.post('http://localhost:4000/mybook/update/' + bookid, obj)
            .catch(function (error) {
                console.log(error);
            })

        const objNew = {
            book_id: bookid
        };

        await axios.post('http://localhost:4000/user/removerented', objNew)

        this.props.history.push('/rentalList');
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

            const obj = {
                book_name: bookName,
                book_description: bookDescription,
                availablity: this.state.availablity,
                rental_price: this.state.rental_price,
                owner_id: this.state.owner_id
            };
            await axios.post('http://localhost:4000/mybook/update/' + this.props.match.params.id, obj)

            this.props.history.push('/myBooks');
        } catch (e) {
            alert(e);
        }
    }

    render() {
        if (this.state.availablity === true) {
            return (
                <div>
                    <br />
                    <div className="container">
                        <h3>UPDATE BOOK</h3>
                        <hr />
                        <br />
                        <Container>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">BOOK NAME: </label>
                                    <input type="text" required
                                        minLength="3"
                                        maxLength="35"
                                        className="form-control col"
                                        value={this.state.book_name}
                                        onChange={this.onChangeBookName}
                                    />
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">BOOK DESCRIPTION: </label>
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
                                    <label className="col-sm-2 col-form-label col-form-label-sm">RENTAL PRICE: </label>
                                    <input
                                        type="number" required
                                        className="form-control col"
                                        value={this.state.rental_price}
                                        onChange={this.onChangeRentalPrice} />
                                </div>
                                <br />
                                <div className="form-group">
                                    <input type="submit" value="UPDATE BOOK" className="btn btn-primary float-right" />
                                </div>
                                <div>
                                    <button className="btn btn-danger" onClick={this.onDelete}>
                                        DELETE BOOK
                                     </button>
                                </div>
                            </form>
                        </Container>
                    </div>

                </div>
            )
        } else {
            return (
                <div>
                    <br />
                    <div>
                        <h3>UPDATE BOOK</h3>
                        <br />
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group row">
                                <label className="col">Book Name: </label>
                                <input type="text" required
                                    className="form-control col"
                                    value={this.state.book_name}
                                    onChange={this.onChangeBookName}
                                />
                            </div>
                            <div className="form-group row">
                                <label className="col">Book Description: </label>
                                <input
                                    type="text" required
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
                            <br />
                            <button className="btn btn-danger" onClick={this.onChangeAvaible}>
                                Make Available
                   </button>
                            <div className="form-group">
                                <input type="submit" value="UPDATE BOOK" className="btn btn-primary float-right" />
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}
