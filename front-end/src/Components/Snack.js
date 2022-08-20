import { Link } from "react-router-dom";
import heartSolid from "../assets/heart-solid.png";
import heartOutline from "../assets/heart-regular.png";

function Snack({ snack }) {
  return (
    <div className="Card">
      <Link to={`/snacks/${snack.id}`}>
        <h4>
          <span>
            <img
              src={snack.image}
              alt={snack.is_healthy ? "healthy food" : "unhealthy food"}
            />
          </span>
        </h4>
        <h4>{snack.name}</h4>
        <img
          className="hearts"
          src={snack.is_healthy ? heartSolid : heartOutline}
          alt="heart"
        />
      </Link>
    </div>
  );
}

export default Snack;
