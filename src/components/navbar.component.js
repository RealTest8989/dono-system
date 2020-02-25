import React, { Component } from 'react';
import Logo from '../logo.png';


export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div className="container">
        <a className="navbar-brand" href="#"><img src={Logo} alt="Logo" />Captain Content</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/"><i className="fas fa-money-bill-wave"></i>Donate</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.youtube.com/user/maxmonseinable" target="_blank"><i className="fab fa-youtube"></i>Youtube</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://Instagram.com/captaincontentlive" target="_blank"><i className="fab fa-instagram"></i>Instagram</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://discordapp.com/invite/yp8ZbrB" target="_blank"><i className="fab fa-discord"></i>Discord</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
  }
}