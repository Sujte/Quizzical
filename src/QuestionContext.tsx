import { createContext, ReactNode } from "react";
import { useEffect, useReducer } from "react";
import reducer, { ACTION_TYPES, MyState, Action } from "./reducer";
import { nanoid } from "nanoid";

interface MyContext {
  flip: (aId: string, myqId: string) => void;
  correctNum: () => number;
  youWin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  state: MyState;
  dispatch: React.Dispatch<Action>;
  isLoading: boolean;
  gameOver: boolean;
  questionArr: {
    question: string;
    qId: string;
    answers: {
      answer: string;
      aId: string;
      isHeld: boolean;
      correct: boolean;
    }[];
  }[];
  allAnswers: (
    answerI: string[],
    answerC: string
  ) => {
    answer: string;
    aId: string;
    isHeld: boolean;
    correct: boolean;
  }[];
}

export const QuestionContext = createContext<MyContext | null>(null);

interface MyResponse {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
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

export const QuestionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    questionArray: [],
    gameOver: false,
    isLoading: false,
  });

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.IS_LOADING, payload: { isLoading: true } });
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
      dispatch({
        type: ACTION_TYPES.QUESTION_ARRAY,
        payload: { questionArray: myArray },
      });
      dispatch({
        type: ACTION_TYPES.IS_LOADING,
        payload: { isLoading: false },
      });
    });
  }, []);

  const flip = (aId: string, myqId: string) => {
    if (state.gameOver === false) {
      const newArr = state.questionArray.map((x) =>
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
      dispatch({
        type: ACTION_TYPES.QUESTION_ARRAY,
        payload: { questionArray: newArr },
      });
    }
  };

  const youWin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (state.gameOver === false) {
      dispatch({ type: ACTION_TYPES.GAME_OVER, payload: { gameOver: true } });
      event.preventDefault();
    } else if (state.gameOver) {
      dispatch({ type: ACTION_TYPES.GAME_OVER, payload: { gameOver: false } });
    }
  };

  const correctNum = () => {
    let rigthAns = 0;

    state.questionArray.map((x) =>
      x.answers.map((y) => {
        if (y.isHeld && y.correct) {
          rigthAns = rigthAns + 1;
        }
        return rigthAns;
      })
    );

    return rigthAns;
  };

  const questionArr = state.questionArray;
  const isLoading = state.isLoading;
  const gameOver = state.gameOver;

  return (
    <QuestionContext.Provider
      value={{
        correctNum,
        youWin,
        flip,
        state,
        dispatch,
        allAnswers,
        questionArr,
        isLoading,
        gameOver,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
