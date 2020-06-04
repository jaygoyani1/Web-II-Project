import React, { Component } from 'react';
import '../App.css';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import firebase from 'firebase/app'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { FaUpload } from "react-icons/fa";

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: []
        };
        this.onDrop = this.onDrop.bind(this);
        this.uploadImages = this.uploadImages.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: picture,
        });
    }
    async uploadImages() {
        try {
            if (this.state.pictures.length == 0) {
                throw "Select Profile's image!";
            }
            let uploadPromises = this.state.pictures.map(async image => {
                let data = new FormData()
                data.append('image', image, image.name);
                return await axios.post('http://localhost:4000/api/uploadImages', data)

            })

            await axios.all(uploadPromises)
                .then(async results => {
                    let u = firebase.auth().currentUser.uid
                    const obj = {
                        profile_pic: results[0].data.downloadUrl
                    }
                    await axios.post('http://localhost:4000/user/uploadImages/' + u, obj)

                    this.props.history.push('/ProfilePage');
                })
                .catch(e => {
                    console.log(e)
                })
        } catch (e) {
            alert(e);
        }
    }
    render() {
        return (
            <div>
                <br />
                <h2 className="text-center">UPLOAD YOUR IMAGE</h2>
                <hr />
                <Container>
                    <ImageUploader
                        withIcon={true}
                        withPreview={true}
                        buttonText='Select your profile photo'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png']}
                        maxFileSize={5242880}
                        singleImage={true}
                    />

                    <Row>
                        <Col className="text-center">
                            <br />
                            <Button variant="success" onClick={this.uploadImages}>
                                <FaUpload /> UPLOAD IMAGE
                            </Button>
                        </Col>
                    </Row>
                </Container>

            </div>

        );
    }
}

export default Image;