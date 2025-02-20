import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function NewSnack() {
  const navigate = useNavigate();
  const [snack, setSnack] = useState({
    name: "",
    fiber: 0,
    protein: 0,
    added_sugar: 0,
    is_healthy: false,
    image: "",
  });

  const handleTextChange = (event) => {
    setSnack({ ...snack, [event.target.id]: event.target.value });
  };

  const handleCheckbox = () => {
    setSnack({ ...snack, is_healthy: !snack.is_healthy });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${API}/snacks`, snack)
      .then((res) => {
        navigate(`/snacks`);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  return (
    <div className="form">
      <div>
        <h5>Snack Health is determined by</h5>
        <ul>
          <li>protein is above 5 grams</li>
          <li>or fiber is above 5 grams</li>
          <li>and sugar is less than 5 grams</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <h3>Add a New Snack!</h3>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="snack-name"
          onChange={handleTextChange}
          id="name"
        />
        <label htmlFor="fiber">Fiber:</label>
        <input
          type="number"
          name="fiber-count"
          onChange={handleTextChange}
          id="fiber"
        />
        <label htmlFor="protein">Protein:</label>
        <input
          type="number"
          name="protein-count"
          onChange={handleTextChange}
          id="protein"
        />
        <label htmlFor="added_sugar">Added Sugars:</label>
        <input
          type="number"
          name="added_sugar_count"
          onChange={handleTextChange}
          id="added_sugar"
        />
        <label htmlFor="healthy">Is it Healthy?</label>
        <input
          type="checkbox"
          name="healthy"
          onClick={handleCheckbox}
          id="healthy"
        />
        <label htmlFor="image">Image</label>
        <input
          type="text"
          alt="snack"
          name="image"
          onChange={handleTextChange}
          id="image"
          placeholder="Place Image Link Here..."
        />

        <br></br>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default NewSnack;
