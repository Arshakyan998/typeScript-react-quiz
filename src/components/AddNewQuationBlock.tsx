import React, { FormEvent } from "react";
import { answers } from "../redux/types/Main";

import s from "./newQuiz.module.scss";
import { useHistory, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addNewQuest } from "../redux/actions/main";

interface iQuiz {
  qutionText: string;
  answersOption: answers[] | any[];
}
interface iParams {
  id?: number | string;
}

const AddNewQuationBlock: React.FC = (): React.ReactElement => {
  const [answerCount, setAnswerCount] = React.useState<number[]>([1, 2]);
  const [answers, setAnswers] = React.useState<iQuiz>({
    qutionText: "",
    answersOption: [],
  });

  const params: iParams = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [areTheFieldsFilled, setAreTheFieldsFilled] =
    React.useState<boolean>(false);
  const [quationInput, setQuationInput] = React.useState<boolean>(true);

  const [chkedRadio, setChakeRadio] = React.useState<number>(1);

  const inputEl = React.useRef<HTMLInputElement[] | any[]>([]);
  const inputIndex = React.useRef<number[]>([]);

  const radioEl = React.useRef<HTMLInputElement[] | any[]>([]);

  const quationText = React.useRef<HTMLInputElement | null>(null);

  const arrayForState = () => {
    let answerArray = inputEl.current.filter(Boolean).map((el) => {
      let inputRadioBtn = radioEl.current.filter(Boolean)[+el.dataset.text - 1];

      if (
        inputIndex.current?.includes(+el.dataset.text) &&
        inputRadioBtn.value === el.dataset.text
      )  {
        
          return {
            answerText: el.value,
            isTrue: inputRadioBtn.checked ? true : false,
          };
        
      }
    });
    return answerArray;
  };

  const checkForm = () => { 

    const arr = arrayForState();  
    checkInput()
    
    

    if (quationText.current?.value === "" ) {
      setQuationInput(false);
      return;
    }
   
     
      setAnswers({
        ...answers,
        qutionText: quationText.current?.value as string,
        answersOption: arr,
      });      
       
       

     if (areTheFieldsFilled === false) {
      return;
    }
  };

  React.useEffect(() => {
    
    if (areTheFieldsFilled) {
      const result = {
        ...answers,
        id: Date.now(),
        userId: params.id,
      };
      
      dispatch(addNewQuest(result));
      inputEl.current.forEach((el) => {
        if (el !== null && areTheFieldsFilled) {
          el.value = "";
        }
      });
      if(quationText.current?.value){
        quationText.current.value = ""
      }     

    }

  }, [ answers.qutionText,areTheFieldsFilled]);

  const addNewBlock = (): void => {
    let x: number = 0;
    const newBloc = [...answerCount].forEach((el) => {
      return (x = el + 1);
    });
    const block = [...answerCount, x];
    setAnswerCount(block);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };
  const changeCurrenradio = (el: number) => {
    setChakeRadio(el);
  };

  

  function checkInput(inp:any[]=[],i:number=0):any{
    inp =inputEl.current.filter(Boolean)
   
    
    if(inp[i].value===""){
      setAreTheFieldsFilled(false);
      return 
    }else{
      setAreTheFieldsFilled(true);
    }
   if(i===inp.length-1){
     return 
   }else{
   return checkInput(inp,i=i+1)
   }

  }


  const removeBlock = (): void => {
    const removeBlock = [...answerCount];
    const block = removeBlock.pop();

    setChakeRadio(removeBlock[0]);
    setAnswerCount(removeBlock);
  };
  return (
    <div className={s.main}>
      <button onClick={() => history.push("/")} className={s.back}>
        {" "}
        К вопросам{" "}
      </button>
      <form onSubmit={handleSubmit}>
        <h1>Текст вопроса</h1>
        <div className={s.main_quation}>
          <input type="text" ref={quationText} placeholder="вопрос" />
          {!quationInput && <h3 style={{ color: "#fff" }}>Введите вопрос</h3>}
        </div>
        <div>
          {answerCount.map((el, i) => {
            return (
              <div key={el}>
                <span style={{ color: "#fff" }}> Ответ номер {i + 1}</span>{" "}
                <input
                  type="radio"
                  checked={el === chkedRadio}
                  name="isTrue"
                  ref={(ref) => (radioEl.current[el] = ref)}
                  value={el}
                  onChange={() => changeCurrenradio(el)}
                />
                <input
                  type="text"
                  data-text={el}
                  ref={(ref) => ({
                    inputEl: (inputEl.current[el] = ref),
                    inputIndex: (inputIndex.current[el] = el),
                  })}
                  placeholder={`ответ ${i + 1}`}
                  
                />
              </div>
            );
          })}
        </div>
        {!areTheFieldsFilled && (
          <h3 style={{ color: "#fff" }}>Заполни все поля</h3>
        )}
        <div>
          {answerCount.length < 5 && (
            <button className={s.main_add_new_block} onClick={addNewBlock}>
              +
            </button>
          )}
          {answerCount.length > 2 && (
            <button className={s.main_add_new_block} onClick={removeBlock}>
              X
            </button>
          )}
        </div>
        <div>
          <button onClick={checkForm} className={s.static}>
            Добавить
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewQuationBlock;
