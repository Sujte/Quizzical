import { useContext } from "react";
import blob1 from "./blobs/blob-1.svg";
import blob2 from "./blobs/blob-2.svg";
import Section from "./Section";
import { QuestionContext } from "./QuestionContext";

function Quiz() {
  const ctx = useContext(QuestionContext);

  if (!ctx) {
    return null;
  }

  const { correctNum, youWin, questionArr, isLoading, gameOver } = ctx;

  return (
    <div>
      {isLoading && (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="quiz">
        <div>
          <img src={blob1} className="blob1" alt="" />
          <img src={blob2} className="blob2" alt="" />
        </div>
        <form className="wrap2">
          {questionArr.map((x) => (
            <Section
              question={x.question}
              answers={x.answers}
              qId={x.qId}
              key={x.qId}
            />
          ))}

          <div className="button-text">
            {gameOver && (
              <p className="you-win">
                You scored {correctNum()}/5 correct answers
              </p>
            )}
            {!isLoading && (
              <button className="submit" onClick={(e) => youWin(e)}>
                {gameOver ? "Play again" : "Check answers"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Quiz;
