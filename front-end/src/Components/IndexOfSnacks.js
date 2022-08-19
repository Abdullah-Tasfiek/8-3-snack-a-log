import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EditSnack from "./EditSnack";


const SnackIndex = () => {
  const [snacks, setSnacks] = useState([]);
  const navigate = useNavigate();

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
  console.log(snacks);

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
    }).then((response) => {
      navigate('/snacks')
    });
  };

  return (
    <div className="snacks-list">
      <h1>Snack-A-Log Index</h1>
      {snacks.map((snack, index) => {
        return (
          <div key={index}>
            <h4>{snack.name}</h4>
            <h3>Fiber Count: {snack.fiber}</h3>
            <h3>Protein Count: {snack.protein}</h3>
            <h3>Added Sugar Count: {snack.added_sugar}</h3>
            <h4>Is it Healthy? {snack.is_healthy ? '❤️' : '💀'}</h4>
            <img src={snack.image} alt=''/>
            <br></br>
            <button><Link className="snack-link" to={`/snacks/${snack.id}`}>
              Snack Details
            </Link></button>
            <br></br>
            <button id={snack.id} onClick={handleDelete}>
              Delete Snack!
            </button>
            <br></br>
            <button><Link to={`/snacks/edit/${snack.id}`}>Edit Snack</Link></button>
            <br></br>
            <button><Link to='/'>Back</Link></button>
          </div>
        );
      })}
    </div>
  );
};

export default SnackIndex;
