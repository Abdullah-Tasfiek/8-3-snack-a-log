import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import heartSolid from "../assets/heart-solid.png";
import heartOutline from "../assets/heart-regular.png";

const ShowSnack = () => {
  const [snacks, setSnacks] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API}/snacks/${id}`).then((response) => {
      setSnacks(response.data.payload);
    });
  }, [id, navigate, API]);
  const deleteSnack = () => {
    axios
      .delete(`${API}/snacks/${id}`)
      .then(() => {
        navigate(`/snacks`);
      })
      .catch((c) => console.error("catch", c));
  };

  const handleDelete = () => {
    deleteSnack();
  };

  const { name, fiber, protein, added_sugar, is_healthy, image } = snacks;
  return (
    <div>
      <h3>{name}</h3>
      <aside>
        <img
          className="hearts"
          src={is_healthy ? heartSolid : heartOutline}
          alt={is_healthy ? "healthy food" : "unhealthy food"}
        />
      </aside>
      <article>
        <div>
          <img src={image} alt={name} />
          <h3>Fiber: {fiber}g</h3>
          <h3>Protein: {protein}g</h3>
          <h3>Added Sugar: {added_sugar}g</h3>
        </div>
      </article>

      <br />
      <button href="/snacks">
        <Link to={"/snacks"}>Back</Link>
      </button>
      <br />
      <button>
        <Link to={`/snacks/${id}/edit`}>Edit Snack</Link>
      </button>
      <br></br>
      <button id={snacks.id} onClick={handleDelete}>
        Delete Entry
      </button>
    </div>
  );
};

export default ShowSnack;
