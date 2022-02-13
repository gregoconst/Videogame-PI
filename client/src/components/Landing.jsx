import { Link } from "react-router-dom";
import "./styles/Landing.css";


export default function Landing() {
  return (
    <>
      <div className="background">
        {/* <div className="button"> */}
          <Link to={"/home"}>
            <div className="homeBtn"></div>
          </Link>
        {/* </div> */}
      </div>
    </>
  );
}
