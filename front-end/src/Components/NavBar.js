import { Link } from "react-router-dom";
import React from "react";

const Nav = () => {
  return (
    <div className="nav" id="nav">
      <Link className="nav-link" to="/snacks">
        <h2>Snack-A-Log!</h2>
      </Link>
      <br></br>
      <Link className="nav-link" to="/snacks/new">
        New Snack
      </Link>
    </div>
  );
};

export default Nav;
