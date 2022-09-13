import { useContext } from "react";
import { QuestionContext } from "./QuestionContext";

function Answer(prop: {
  qId: string;
  ans: string;
  aId: string;
  isHeld: boolean;
  correct: boolean;
}) {
  const ctx = useContext(QuestionContext);

  if (!ctx) {
    return null;
  }

  const { flip, gameOver } = ctx;

  const stylesF = () => {
    if (gameOver === false) {
      return {
        background: prop.isHeld ? "#d6dbf5" : "#f5f7fb",
        border: prop.isHeld ? "1px solid #d6dbf5" : "1px solid #4d5b9e",
      };
    } else {
      if (prop.isHeld && prop.correct) {
        return {
          background: "#94D7A2",
          border: "1px solid #94D7A2",
          cursor: "auto",
        };
      } else if (prop.isHeld && !prop.correct) {
        return {
          background: "#F8BCBC",
          border: "1px solid #F8BCBC",
          color: "#A3A9CA",
          cursor: "auto",
        };
      } else if (!prop.isHeld && prop.correct) {
        return {
          background: "#94D7A2",
          border: "1px solid #94D7A2",
          cursor: "auto",
        };
      } else {
        return {
          border: "1px solid #A3A9CA",
          color: "#A3A9CA",
          background: "#f5f7fb",
          cursor: "auto",
        };
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        className="ans"
        dangerouslySetInnerHTML={{ __html: prop.ans }}
        style={stylesF()}
        onClick={() => flip(prop.aId, prop.qId)}
      ></button>
    </div>
  );
}
export default Answer;
