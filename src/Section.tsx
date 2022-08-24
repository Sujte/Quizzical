import { useState } from "react";
import Answer from "./Answer";
import { nanoid } from "nanoid";

const allAnswers = (answerI: string[], answerC: string) => {
  const indexC =
    answerI.length === 1
      ? Math.floor(Math.random() * 2)
      : Math.floor(Math.random() * 4);

  const myAnswerArray = [...answerI];
  myAnswerArray.splice(indexC, 0, answerC);

  const myAnsObjArr = myAnswerArray.map((x) => ({
    answer: x,
    key: nanoid(),
    isHeld: false,
  }));

  return myAnsObjArr;
};

function Section(prop: {
  question: string;
  answerC: string;
  answerI: string[];
  key: string;
}) {
  const [ansArr, setAnsArr] = useState(allAnswers(prop.answerI, prop.answerC));

  const flip = (key: string) => {
    setAnsArr((arr) =>
      arr.map((x) =>
        x.key === key ? { ...x, isHeld: !x.isHeld } : { ...x, isHeld: false }
      )
    );
  };

  return (
    <form className="section">
      <h2 dangerouslySetInnerHTML={{ __html: prop.question }}></h2>
      <div className="allAns">
        {ansArr.map((x) => (
          <Answer
            ans={x.answer}
            isHeld={x.isHeld}
            flip={() => {
              flip(x.key);
            }}
            key={x.key}
          />
        ))}
      </div>
      <div className="line"></div>
    </form>
  );
}
export default Section;
