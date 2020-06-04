import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as NavLink, Link } from "react-router-dom";
import firebase from 'firebase/app';


function Book(props) {

    if (props.mybook.availablity === true && props.mybook.owner_id !== firebase.auth().currentUser.uid) {
        return (
            <tr>
                <td>{props.mybook.book_name}</td>
                <td>{props.mybook.rental_price}</td>
                <td>
                    <Link to={"/rentalConfirm/" + props.mybook._id + "/" + firebase.auth().currentUser.uid}>RENT</Link>
                </td>
            </tr>
        )
    }
    else if (props.mybook.owner_id !== firebase.auth().currentUser.uid) {
        return (
            <tr>
                <td>{props.mybook.book_name}</td>
                <td>{props.mybook.rental_price}</td>

                <td>

                    <p className='text-danger'>NOT AVAILABLE</p>

                </td>
            </tr>
        )
    } else {
        return (<tr><td>-</td><td>-</td><td>-</td></tr>)
    }
}

export default class RentalList extends Component {

    constructor(props) {
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeBookName = this.onChangeBookName.bind(this);

        this.state = { search_term: '', mybook: [] };
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
    onChangeSearch(e) {
        this.setState({
            search_term: e.target.value
        });
    }

    async onChangeBookName(e) {
        e.preventDefault();
        const obj = {
            name: this.state.search_term.trim()
        }
        await axios.post('http://localhost:4000/mybook/search/', obj)
            .then(response => {
                this.setState({ mybook: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

    }
    mybookList() {

        return this.state.mybook.map(function (currentMybook, i) {
            return <Book mybook={currentMybook} key={i} />;
        })
    }

    render() {
        return (
            <div className="container">

                <br />
                <div>
                    <h1 className="text-center">RENTAL LIST</h1>
                    <div className="row float-center">
                        <input id="my-input" type="text"
                            className="form-control col"
                            value={this.state.search_term}
                            onChange={this.onChangeSearch}
                        />  <button type='button' className="btn btn-warning" onClick={this.onChangeBookName}>SEARCH</button>
                    </div>


                    <table className="table table-striped container" style={{ marginTop: 20 }} >
                        <thead>
                            <tr>
                                <th>BOOK NAME</th>
                                <th>RENTAL PRICE</th>
                                <th>RENT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.mybookList()}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}