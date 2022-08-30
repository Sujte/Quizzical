import Answer from "./Answer";

function Section(prop: {
  question: string;
  answers: { answer: string; aId: string; isHeld: boolean; correct: boolean }[];
  qId: string;
  flip: (aId: string, qId: string) => void;
  state: boolean;
}) {
  return (
    <div className="section">
      <h2 dangerouslySetInnerHTML={{ __html: prop.question }}></h2>
      <div className="allAns">
        {prop.answers.map((x) => (
          <Answer
            ans={x.answer}
            aId={x.aId}
            isHeld={x.isHeld}
            flip={prop.flip}
            key={x.aId}
            qId={prop.qId}
            state={prop.state}
            correct={x.correct}
          />
        ))}
      </div>
      <div className="line"></div>
    </div>
  );
}
export default Section;
