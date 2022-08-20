import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Snack from "./Snack";

const SnackIndex = () => {
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    const API = process.env.REACT_APP_API_URL;
    axios
      .get(`${API}/snacks`)
      .then((response) => {
        setSnacks(response.data.payload);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <section className="Card">
        <article className="Snacks">
          <h1>Snacks List</h1>
          <div className="card">
            {snacks.map((snack) => {
              return <Snack key={snack.id} snack={snack} />;
            })}
          </div>
        </article>
      </section>
      <button>
        <Link to="/">Back</Link>
      </button>
    </div>
  );
};

export default SnackIndex;
