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
    <form onSubmit={handleSubmit}>
      <h4>Add a New Snack!</h4>
      <label for="name">Name:</label>
      <input
        type="text"
        name="snack-name"
        onChange={handleTextChange}
        id="name"
      />
      <label for="fiber">Fiber:</label>
      <input
        type="number"
        name="fiber-count"
        onChange={handleTextChange}
        id="fiber"
      />
      <label for="protein">Protein:</label>
      <input
        type="number"
        name="protein-count"
        onChange={handleTextChange}
        id="protein"
      />
      <label for="added_sugar">Added Sugars:</label>
      <input
        type="number"
        name="added-sugar-count"
        onChange={handleTextChange}
        id="added_sugar"
      />
      <label>Is it Healthy?</label>
      <input
        type="checkbox"
        name="healthy"
        onClick={handleCheckbox}
        id="healthy"
      />
      <label for="image">Image</label>
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
  );
}

export default NewSnack;
