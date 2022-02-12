import { Link } from "react-router-dom";
import "./styles/Landing.css";


export default function Landing() {
  return (
    <>
      <div className="container">
        <div className="button">
          <Link to={"/home"}>
            <button>Enter</button>
          </Link>
        </div>
      </div>
    </>
  );
}
