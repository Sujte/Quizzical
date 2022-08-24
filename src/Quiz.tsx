import { useEffect, useState } from "react";
import Section from "./Section";
import blob1 from "./blobs/blob-1.svg";
import blob2 from "./blobs/blob-2.svg";
import { nanoid } from "nanoid";

interface MyResponse {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
/////

function Quiz() {
  const [array, setArray] = useState<MyResponse[]>([]);

  const showAns = () => {};

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await response.json();
      return data;
    };

    getQuestions().then((data) => setArray(data.results));
  }, [0]);

  return (
    <div className="quiz">
      <div>
        <img src={blob1} className="blob1" />
        <img src={blob2} className="blob2" />
      </div>
      <div className="wrap2">
        {array.map((x) => (
          <Section
            question={x.question}
            answerC={x.correct_answer}
            answerI={x.incorrect_answers}
            key={nanoid()}
          />
        ))}
      </div>
      <button type="submit" className="submit" onClick={showAns}>
        Check answers
      </button>
    </div>
  );
}
export default Quiz;
