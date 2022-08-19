import { Link } from "react-router-dom";
import React from "react";

const Nav = () => {
  return (
    <nav>
      <Link className="nav-link" to="/snacks">
        <h2>Snack-A-Log!</h2>
      </Link>
      <br></br>
      <Link className="nav-link" to="/snacks/new">
        <button href="/snacks/new">New Snack</button>
      </Link>
    </nav>
  );
};

export default Nav;
