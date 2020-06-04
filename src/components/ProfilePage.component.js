import React, { Component } from 'react'
import axios from 'axios'
import firebase from 'firebase/app';
import Button from 'react-bootstrap/Button';
import Img from '../images/NoProfileImage.jpg'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { FaEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = { user: {} ,removeImageTag:''}
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitImage = this.onSubmitImage.bind(this);
        this.onRemoveImage = this.onRemoveImage.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.checkImage = this.checkImage.bind(this)
        this.removeImageTagF = this.removeImageTagF.bind(this)

    }

    async componentDidMount() {
        let u = firebase.auth().currentUser.uid
        await axios.get('http://localhost:4000/user/SI/' + u)
            .then(response => {
                this.setState({ user: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.history.push('/profileUpdate/' + this.state.user._id);
    }

    onSubmitImage(e) {
        e.preventDefault();
        this.props.history.push('/Image');
    }

    async onRemoveImage(e) {
        e.preventDefault();
        let u = firebase.auth().currentUser.uid
        const obj = {
            profile_pic: ""
        }
        await axios.post('http://localhost:4000/user/uploadImages/' + u, obj)
            // .then(response => (console.log(response.data)))

        this.props.history.push('/ProfilePage');
        window.location.reload()
    // })
        // this.props.history.push('/Image');
    }

    onSubmitPassword(e) {
        e.preventDefault();
        this.props.history.push('/Account');
    }

    checkImage() {
        if (this.state.user.profile_pic == '') {
            return <img alt='profilepicture' src={Img}></img>
        } else {
            return <img alt='profilepicture' src={this.state.user.profile_pic}></img>
        }
    }

    removeImageTagF() {
        if (this.state.user.profile_pic != '') {
            return <Col className="text-center"><Button variant="success" onClick={this.onRemoveImage}> <FaUserEdit /> REMOVE PROFILE IMAGE</Button></Col>
        } 
    }


    render() {
        // let removeImageTag=null
        // if(this.state.user.profile_pic)
        let checkImage = null
        if (this.state.user.profile_pic == '') {
            // removeImageTag=
            
            checkImage = Img
        } else {
            checkImage = this.state.user.profile_pic
        }
        return (
            <div className="container">
                <br />
                <h1 className="text-center">PROFILE</h1>
                <hr />
                <table className="table">
                    <tbody>
                    <tr>
                        <td className="text-center book">
                            <div className="book-view">
                                <img className="profile-image"alt="book" src={checkImage} />
                            </div>
                        </td>
                        <td className="table-info profile">
                            <br /> <br />
                            <div className="text-left">
                                <div className="heading">Name:</div> {this.state.user.first_name} {this.state.user.last_name}
                                <br /><br />
                                <div className="heading">EMAIL:</div>  {this.state.user.email}
                                <br /><br />
                                <div className="heading">PHONE:</div>  {this.state.user.phone_number}
                                <br /><br />
                            </div>
                            <br /><br />
                            <Row>
                                <Col className="text-right"><Button variant="success" onClick={this.onSubmit}> <FaEdit /> EDIT PROFILE</Button></Col>
                                <Col className="text-center"><Button variant="success" onClick={this.onSubmitImage}> <FaUserEdit /> UPDATE PROFILE IMAGE</Button></Col>
                                {this.removeImageTagF()}
                                <Col className="text-left"><Button variant="success" onClick={this.onSubmitPassword}> <FaKey /> CHANGE PASSWORD</Button></Col>
                            </Row>
                            
                        </td>
                    </tr>
                    </tbody>
                </table>

                <br />

                <hr />
                <div className="">
                </div>
                <hr />
                <br />

            </div>
        )
    }
}
