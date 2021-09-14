import React from "react";

import { quizAnswers } from "./Quiz";
import s from "./index.module.scss";

interface Props {
  items: quizAnswers[];
}

const TrueAnswers: React.FC<Props> = ({ items }): React.ReactElement => {
  return (
    <div className={s.main_answer_block_flex}>
      {items.map((el) => {
        return (
          <div
            key={ el.text}
            style={{
              boxShadow: el.isTrue
                ? " 0px 0px 8px 6px green"
                : " 0px 0px 8px 6px  red",
            }}
            className={s.main_answer_block_text}
          >
            <div>
              <h1>
             <span style={{fontSize:'15px', color:el.isTrue?'green':'red'}}> Ваш ответ</span> <br />
                {" "}
                {el.quiz}: {el.text}{" "}
                <hr />   
                   <span style={{fontSize:'15px'}}>Правильный ответ</span> <br /> 
              {el.isTrue ?el.quiz +':'+ el.trueAnswer:el.quiz +':'+ el.trueAnswer }{" "}
                  
              </h1>
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
};

export default TrueAnswers;
