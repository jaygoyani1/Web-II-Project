import React, { Component } from 'react'
import logo from '../logo.jpg'

export default class LogOut extends Component {
    render() {
        return (
            <div>
                {/* nav */}
                <nav class="navbar navbar-expand-lg navbar-light bg-light text-center">
                    <a class="navbar-brand" href="/myBooks">
                        <img src={logo} width="30" height="30" class="d-inline-block align-top" alt="rent" />
                        RENT MY BOOK
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="/rentalList">RENTAL LIST</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/profilePage">PROFILE</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/helpPage">HELP</a>
                            </li>

                        </ul>
                    </div>
                </nav>
            {/* end of nav */}

                <h1 className="text-center">You have successfully logged out !!!</h1>
            </div>
        )
    }
}
