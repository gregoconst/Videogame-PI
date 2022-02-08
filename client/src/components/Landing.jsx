import { Link } from "react-router-dom";
import styles from "./styles/Landing.module.css";

export default function Landing() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.button}>
          <Link to={"/home"}>
            <button>Enter</button>
          </Link>
        </div>
      </div>
    </>
  );
}

// export default function Landing() {
//     return (
//       <div>
//         <h2>soy Landing</h2>
//       </div>
//     );
//   }
