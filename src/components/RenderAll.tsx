import React from "react";

import { answers } from "../redux/types/Main";
import s from "./index.module.scss";

interface Params {
  isTrue: boolean;
  answerText: string;
  quizNumber: number;
}

interface Props {
  item: answers;
  channgeQuashion: (
    isTrue: boolean,
    answerText: string,
    quizNumber: number
  ) => void;
  options: Params;
}

const RenderAll: React.FC<Props> = ({
  item,
  channgeQuashion,
  options,
}): React.ReactElement => {
  return (
    <div className={s.main_button_block}>
      <button
        onClick={() =>
          channgeQuashion(
            options.isTrue,
            options.answerText,
            options.quizNumber
          )
        }
      >
        {item.answerText}
      </button>
    </div>
  );
};

export default RenderAll;
