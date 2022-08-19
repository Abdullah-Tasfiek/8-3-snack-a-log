import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function EditSnack() {
  let { id } = useParams();
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

  useEffect(() => {
    axios.get(`${API}/snacks/${id}`).then(
      (response) => setSnack(response.data.payload),
      (error) => navigate("/not-found")
    );
  }, [id, navigate]);

  const updateSnack = (editedSnack) => {
    axios
      .put(`${API}/snacks/${id}`, editedSnack)
      .then(
        () => {
          navigate(`/snacks/${id}`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSnack(snack, id);
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit} id="edit-form">
        <label htmlFor="name">Name: </label>
        <br></br>
        <input
          id="name"
          value={snack.name}
          type="text"
          onChange={handleTextChange}
          required
        />
        <br></br>
        <label htmlFor="fiber-count">Fiber Count: </label>
        <br></br>
        <input
          id="fiber-count"
          type="number"
          name="fiber-count"
          value={snack.fiber}
          onChange={handleTextChange}
        />
        <br></br>
        <label htmlFor="protein-count">Protein Count: </label>
        <br></br>
        <input
          id="protein-count"
          type="number"
          value={snack.protein}
          onChange={handleTextChange}
        />
        <br></br>
        <label htmlFor="added-sugar">Any Added Sugars? </label>
        <br></br>
        <input
          id="added-sugar"
          type="number"
          value={snack.added_sugar}
          onChange={handleTextChange}
        />
        <br></br>
        <label htmlFor="is-healthy">Is it Healthy?</label>
        <br></br>
        <input
          id="is-healthy"
          type="checkbox"
          value={snack.is_healthy}
          onChange={handleCheckbox}
        />
        <br></br>
        <label htmlFor="Image">Upload a Picture!</label>
        <br></br>
        <input type="file" id="snack-picture" name="snack-pic" />
        <input type="submit" />
      </form>

      <Link to={`/snacks/${id}`}>
        <button className="back">{`Back to ${snack.name}`}</button>
      </Link>
    </div>
  );
}

export default EditSnack;
