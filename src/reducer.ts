export enum ACTION_TYPES {
  QUESTION_ARRAY = "questionArray",
  GAME_OVER = "gameOver",
  IS_LOADING = "isLoading",
}


export type Action =
  | {
      type: ACTION_TYPES.QUESTION_ARRAY;
      payload: { questionArray: Question[] };
    }
  | {
      type: ACTION_TYPES.GAME_OVER;
      payload: { gameOver: boolean };
    }
  | {
      type: ACTION_TYPES.IS_LOADING;
      payload: { isLoading: boolean };
    };

interface Question {
  question: string;
  qId: string;
  answers: {
    answer: string;
    aId: string;
    isHeld: boolean;
    correct: boolean;
  }[];
}

export interface MyState {
  questionArray: Question[];
  gameOver: boolean;
  isLoading: boolean;
}

const reducer = (state: MyState, action: Action): MyState => {
  switch (action.type) {
    case ACTION_TYPES.QUESTION_ARRAY:
      return { ...state, questionArray: action.payload.questionArray };
    case ACTION_TYPES.GAME_OVER:
      return { ...state, gameOver: action.payload.gameOver };
    case ACTION_TYPES.IS_LOADING:
      return { ...state, isLoading: action.payload.isLoading };
    default:
      return state;
  }
};
export default reducer;
