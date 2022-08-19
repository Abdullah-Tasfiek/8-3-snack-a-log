import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

const EditSnack = () => {
  const [snack, setSnack] = useState({
    name: "",
    fiber: 0,
    protein: 0,
    added_sugar: 0,
    is_healthy: false,
    image: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API}/snacks/${id}`)
      .then((response) => {
        setSnack(response.data.payload);
      })
      .catch((error) => {
        navigate("*");
      });
  }, [id, navigate]);

  const editSnack = (snack) => {
    axios
      .put(`${API}/snacks/${id}`, snack)
      .then(() => {
        navigate(`/snacks`);
      })
      .catch((error) => {
        console.warn(error);
        console.log(Object.keys(snack));
      });
  };

  const handleTextChange = (event) => {
    setSnack({ ...snack, [event.target.id]: event.target.value });
  };
  const handleCheckbox = (event) => {
    setSnack({ ...snack, is_healthy: !snack.is_healthy });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editSnack(snack, id);
  };

  return (
    <div>
      <form id="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <br></br>
        <input id="name" type='text' placeholder='name' required value={snack.name} onChange={handleTextChange} />
        <br></br>
        <label htmlFor="fiber-count">Fiber Count: </label>
        <br></br>
        <input
          id="fiber-count"
          type='text'
          value={snack.fiber}
          onChange={handleTextChange}
        />
        <br></br>
        <label htmlFor="protein-count">Protein Count: </label>
        <br></br>
        <input id="protein-count" type='text' value={snack.protein} onChange={handleTextChange}/>
        <br></br>
        <label htmlFor="added-sugar">Any Added Sugars? </label>
        <br></br>
        <input
          id="added-sugar"
          value={snack.added_sugar}
          onChange={handleTextChange}
        />
        <br></br>
        <label htmlFor="is-healthy">Is it Healthy?</label>
        <br></br>
        <input
          id="is-healthy"
          type="checkbox"
          checked={snack.is_healthy}
          onChange={handleCheckbox}
        />
        <br></br>
        <label htmlFor="Image">Upload a Picture!</label>
        <br></br>
        <input type='file' id='snack-picture' name='snack-pic'/>
        <input type='submit'/>
      </form>

      <Link to={`/snacks/${id}`}>
        <button className="back">{`Back to ${snack.name}`}</button>
      </Link>
    </div>
  );
};

export default EditSnack;
