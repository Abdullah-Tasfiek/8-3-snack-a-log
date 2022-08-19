import { Link } from "react-router-dom";
import heartSolid from "../assets/heart-solid.png";
import heartOutline from "../assets/heart-regular.png";

function Snack({ snack }) {
  return (
    <div className="Snack">
      <Link to={`/snacks/${snack.id}`}>
        <h4>
          <span>
            <img
              src={snack.image}
              alt={snack.is_healthy ? "healthy food" : "unhealthy food"}
            />
          </span>
          {snack.name}
          <img
            className="hearts"
            src={snack.is_healthy ? heartSolid : heartOutline}
            alt="heart"
          />
        </h4>
      </Link>
    </div>
  );
}

export default Snack;
