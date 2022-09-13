import { Link } from "react-router-dom";
import blob1 from "./blobs/blob-1.svg";
import blob2 from "./blobs/blob-2.svg";

function App() {
  return (
    <div className="wrap">
      <div className="intro">
        <h1>Quizzical</h1>
        <h3>Challenge yourself</h3>
        <Link className="button" to="/Quiz">
          Start quiz!
        </Link>
      </div>
      <img src={blob1} className="blob1" alt="" />
      <img src={blob2} className="blob2" alt="" />
    </div>
  );
}

export default App;
