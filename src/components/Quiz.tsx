import React, { ReactElement } from "react";
import { useHistory } from "react-router";
import { useTypedSelector } from "../userHooks/useSelector";

import s from "./index.module.scss";
import Render from "./Render";
import RenderAll from "./RenderAll";
import TrueAnswers from "./TrueAnswers";
import { answers } from "../redux/types/Main";

export interface quizAnswers {
  text?: string;
  isTrue?: boolean | null;
  quiz?: string;
  trueAnswer?: string;
}

export const Quiz = (): ReactElement => {
  const history = useHistory();

  const [trueCount, setTrueCount] = React.useState<quizAnswers[]>([]);
  const [prevDisabled, setPrevDisabled] = React.useState<boolean>(false);
  const [showAnswer, setShowAnswer] = React.useState<boolean>(false);
  const [quizNumber, setQuizNumber] = React.useState<number>(0);

  const { quiz } = useTypedSelector((state) => state.main);

  const channgeQuashion = (
    isTrue: boolean,
    text: string,
    index: number
  ): void => {
    if (quizNumber < quiz.length - 1) {
      setQuizNumber((prev) => prev + 1);
    } else {
      setShowAnswer(true);
    }
    const filterEd: string | undefined = quiz[index].answersOption.find(
      (el) => el.isTrue
    )?.answerText;

    setTrueCount([
      ...trueCount,
      {
        text: text,
        isTrue: isTrue ? true : false,
        quiz: quiz[index].qutionText,
        trueAnswer: filterEd,
      },
    ]);
    setPrevDisabled((prev) => false);
  };

  const prevQuiz = (): void => {
    const result = [...trueCount];
    const coutnTrue = result.pop();
    setQuizNumber((prev) => prev - 1);
    setPrevDisabled((prev) => true);
    setTrueCount(result);
  };

  return (
    <div className={s.main}>
      {!showAnswer ? (
        <div className={s.main_quiz_block}>
          <h1>
            {" "}
            вопросов {"   "} {quizNumber + 1} / {quiz.length}{" "}
          </h1>
          <h3>{quiz[quizNumber].qutionText} </h3>

          <Render
            items={quiz[quizNumber].answersOption}
            renderItmes={(item: answers) => (
              <RenderAll
                item={item}
                key={`${item.answerText+item.isTrue}`}
                channgeQuashion={channgeQuashion}
                options={{
                  isTrue: item.isTrue,
                  answerText: item.answerText,
                  quizNumber: quizNumber,
                }}
              />
            )}
          />

          {quizNumber >= 1 && (
            <button
              onClick={prevQuiz}
              disabled={prevDisabled}
              className={s.static}
            >
              Предедуший
            </button>
          )}
        </div>
      ) : (
        <div className={s.main_answer_block}>
          <h1>ответы</h1>
          <TrueAnswers items={trueCount} />
          <button
            onClick={() => {
              setQuizNumber(0);
              setShowAnswer(false);
              setTrueCount([]);
            }}
            className={s.static}
          >
            еще раз
          </button>
        </div>
      )}
    </div>
  );
};
