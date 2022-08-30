import { useEffect, useState } from "react";
import blob1 from "./blobs/blob-1.svg";
import blob2 from "./blobs/blob-2.svg";
import { nanoid } from "nanoid";
import Section from "./Section";

interface MyResponse {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface MyInfo {
  question: string;
  qId: string;
  answers: {
    answer: string;
    aId: string;
    isHeld: boolean;
    correct: boolean;
  }[];
}

const allAnswers = (answerI: string[], answerC: string) => {
  const indexC =
    answerI.length === 1
      ? Math.floor(Math.random() * 2)
      : Math.floor(Math.random() * 4);

  const myAnswerArray = [...answerI];
  myAnswerArray.splice(indexC, 0, answerC);

  const myAnsObjArr = myAnswerArray.map((x, index) => ({
    answer: x,
    aId: nanoid(),
    isHeld: false,
    correct: index === indexC ? true : false,
  }));

  return myAnsObjArr;
};

function Quiz() {
  const [infoArr, setInfoArr] = useState<MyInfo[]>([]);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getQuestions = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9"
      );
      const data = await response.json();

      return data;
    };
    getQuestions().then((data) => {
      const myArray = data.results.map((x: MyResponse) => ({
        question: x.question,
        qId: nanoid(),
        answers: allAnswers(x.incorrect_answers, x.correct_answer),
      }));
      setInfoArr(myArray);
      setIsLoading(false);
    });
  }, []);

  const flip = (aId: string, myqId: string) => {
    if (done === false) {
      const newArr = infoArr.map((x) =>
        x.qId === myqId
          ? {
              question: x.question,
              qId: x.qId,
              answers: x.answers.map((y) =>
                y.aId === aId
                  ? { ...y, isHeld: !y.isHeld }
                  : { ...y, isHeld: false }
              ),
            }
          : x
      );
      setInfoArr(newArr);
    }
  };

  const youWin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (done === false) {
      setDone(true);
      event.preventDefault();
    } else if (done) {
      setDone(false);
    }
  };

  const correctNum = () => {
    let rigthAns = 0;
    infoArr.map((x) =>
      x.answers.map((y) => {
        if (y.isHeld && y.correct) {
          rigthAns = rigthAns + 1;
        }
      })
    );
    return rigthAns;
  };

  console.log(infoArr);

  return (
    <div>
      {isLoading && (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="quiz">
        <div>
          <img src={blob1} className="blob1" />
          <img src={blob2} className="blob2" />
        </div>
        <form className="wrap2">
          {infoArr.map((x) => (
            <Section
              question={x.question}
              answers={x.answers}
              flip={flip}
              qId={x.qId}
              key={x.qId}
              state={done}
            />
          ))}
          <div className="button-text">
            {done && (
              <p className="you-win">
                You scored {correctNum()}/5 correct answers
              </p>
            )}
            {!isLoading && (
              <button className="submit" onClick={(e) => youWin(e)}>
                {done ? "Play again" : "Check answers"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Quiz;
