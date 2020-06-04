import React, { Component} from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
var user=''

export default class SocialSigninDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name:'',
            last_name:'',
            email:'',
			special_id:'',
            phone_number:'',
            profile_pic:'',
            book_available:[],
            rented:[]
        }
    }

    async componentDidMount(){
        let u = firebase.auth().currentUser.uid
        
        await axios.get('http://localhost:4000/user/SI/' + u)
            .then(response => {user=response})
            
            .catch(function (error) {
                console.log(error);
            })
        if(firebase.auth().currentUser.emailVerified==true && user.data==null){
            let displayName = firebase.auth().currentUser.displayName
            var firstName = displayName.split(' ').slice(0, -1).join(' ');
            var lastName = displayName.split(' ').slice(-1).join(' ');
            // console.log(displayName)
            const newUser = {
                first_name: firstName,
                last_name: lastName,
                email: firebase.auth().currentUser.email,
                special_id: firebase.auth().currentUser.uid,
                phone_number:this.state.phone_number,
                book_available: [],
                rented:[],
                profile_pic:firebase.auth().currentUser.photoURL
            };
    
            await axios.post('http://localhost:4000/user', newUser)
                // .then(res => console.log(res.data));
    
            this.props.history.push('/profilePage');
            window.location.reload(); 
            
            this.setState({
                first_name:'',
                last_name:'',
                email:'',
                phone_number:'',
                book_available: [],
                rented:[],
                profile_pic:''
            })
        }else{
            this.props.history.push('/home');
            window.location.reload();   
        }
    }

render(){

return(<h1></h1>)
}

}