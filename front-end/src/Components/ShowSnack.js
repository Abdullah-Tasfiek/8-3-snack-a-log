import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowSnack = () => {
  const { id } = useParams();
  const [snacks, setSnacks] = useState({});
  const navigate = useNavigate();

  const handleDelete = (event) => {
    event.preventDefault();
    const { id } = event.target;
    console.log("HandleDelte:", id);
    const API = process.env.REACT_APP_API_URL;
    axios.delete(`${API}/snacks/${id}`).then((response) => {
      setSnacks(
        snacks.filter((snack) => {
          return snack.id !== parseInt(id);
        })
      );
      navigate("/snacks")
    });
  };

  useEffect(() => {
    const API = process.env.REACT_APP_API_URL;
    axios
      .get(`${API}/snacks/${id}`)
      .then((response) => {
        setSnacks(response.data.payload);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);
  console.log(snacks);

  const { name, fiber, protein, added_sugar, is_healthy, image } = snacks;
  return (
    <div>
      <h1>{name}</h1>
      <h3>Fiber Count: {fiber}g</h3>
      <h3>Protein Count: {protein}g</h3>
      <h3>Added Sugar Count: {added_sugar}g</h3>
      <h4>Is it Healthy? {is_healthy ? ' ❤️' : ' 💀'}</h4>
      <img type='submit' src={image} alt=''/>
      <br></br>
      <button id={snacks.id} onChange={handleDelete}>
        Delete Entry
      </button>
      <br></br>
      <button><Link to={`/snacks/edit/${id}`}>Edit Snack</Link></button>
      <br></br>
      <button><Link to={'/snacks'}>Back</Link></button>
    </div>
  );
};

export default ShowSnack;
