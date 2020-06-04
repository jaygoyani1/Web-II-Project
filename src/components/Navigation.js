import React, { useContext } from 'react';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './Signout';
import '../App.css';
import logo from '../images/icon1.png';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { FaWindows } from 'react-icons/fa';

const close_window = () => {
  window.top.close()
}


const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  const currentUrl = window.location.href;
  const homeClass = currentUrl.includes("home") ? "active" : "";
  const profilePageClass = currentUrl.includes("profilePage") ? "active" : "";
  const myBooksClass = currentUrl.includes("myBooks") ? "active" : "";
  const rentalListClass = currentUrl.includes("rentalList") ? "active" : "";
  const rentedbooksClass = currentUrl.includes("rentedbooks") ? "active" : "";
  if(window.location.href==="http://localhost:3000/chat"){
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <img
              alt="LOGO"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}  RENT MY BOOK
      </Navbar.Brand>
  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className={close_window} href={'/home'} onClick={close_window}>CLOSE CHAT</Nav.Link>
              {/* <Nav.Link className={profilePageClass} href="/profilePage">PROFILE</Nav.Link>
              <Nav.Link className={myBooksClass} href="/myBooks">MY BOOKS</Nav.Link>
              <Nav.Link className={rentalListClass} href="/rentalList" >RENTAL PLATFORM</Nav.Link>
              <Nav.Link className={rentedbooksClass} href="/rentedbooks" >RENTED BOOKS</Nav.Link>
              <Nav.Link target="_blank" href="/chat" >CHAT ROOM</Nav.Link> */}
            </Nav>
  
            <Nav>
              <Nav.Link href="/helpPage">HELP</Nav.Link>
              <SignOutButton />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
  
    );

  }else{
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt="LOGO"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}  RENT MY BOOK
    </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className={homeClass} href="/home">HOME</Nav.Link>
            <Nav.Link className={profilePageClass} href="/profilePage">PROFILE</Nav.Link>
            <Nav.Link className={myBooksClass} href="/myBooks">MY BOOKS</Nav.Link>
            <Nav.Link className={rentalListClass} href="/rentalList" >RENTAL PLATFORM</Nav.Link>
            <Nav.Link className={rentedbooksClass} href="/rentedbooks" >RENTED BOOKS</Nav.Link>
            <Nav.Link target="_blank" href="/chat" >CHAT ROOM</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link href="/helpPage">HELP</Nav.Link>
            <SignOutButton />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>

  );}
};

const NavigationNonAuth = () => {
  return (
    <div>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt="LOGO"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
      RENT MY BOOK
    </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/signup">SIGN UP</Nav.Link>
            <Nav.Link href="/signin">SIGN IN</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link href="/helpPage">HELP</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;