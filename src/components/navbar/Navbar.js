import React,{ useState } from "react";

import { NavLink, Link } from "react-router-dom";
import "../../App.scss";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

  const navigate = useNavigate();
 
  const Logout = async () => {
      try {
          await axios.delete('http://localhost:5000/logout');
          navigate("/");
      } catch (error) {
          console.log(error);
      }
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        
        <Link to="/" className="navbar-brand fs-3 ubuntu"> <span className="text-primary">TP LPRO </span>
          Rick & Morty 
        </Link>
        <style jsx>{`
          button[aria-expanded="false"] > .close {
            display: none;
          }
          button[aria-expanded="true"] > .open {
            display: none;
          }
        `}</style>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="fas fa-bars open text-dark"></span>
          <span class="fas fa-times close text-dark"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav fs-5">
            <NavLink to="/" className="nav-link">
              Personnages
            </NavLink>
            <NavLink to="/episodes" className="nav-link">
              Episode
            </NavLink>
            <NavLink to="/favorites" className="nav-link">
              Favoris
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/location"
            >
              Location
            </NavLink>
          </div>
          
        </div>
        <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={Logout} className="button is-light">
                                    Déconnexion
                                </button>
                            </div>
                        </div>
                       
                    </div>
      </div>
    </nav>
  );
};

export default Navbar;
