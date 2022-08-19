import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
      <h1>{name}</h1>
      <h3>Fiber Count: {fiber}g</h3>
      <h3>Protein Count: {protein}g</h3>
      <h3>Added Sugar Count: {added_sugar}g</h3>
      <h4>Is it Healthy? {is_healthy ? " ❤️" : " 💀"}</h4>
      <img type="submit" src={image} alt="" />
      <br />
      <button>
        <Link to={"/snacks"}>Back</Link>
      </button>
      <br/>
      <button>
        <Link to={`/snacks/edit/${id}`}>Edit Snack</Link>
      </button>
      <br></br>
      <button id={snacks.id} onClick={handleDelete}>
        Delete Entry
      </button>
    </div>
  );
};

export default ShowSnack;
