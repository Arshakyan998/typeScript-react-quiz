import { validLogin } from '../../components/AuthForm';
 export type answers = {
  answerText: string;
  isTrue: boolean;
};

 interface iQuiz {
  qutionText: string;
  answersOption: answers[];
  id?:number |string;
  userId?:number|string
}
 export interface Quiz extends iQuiz{
        id?:number|string,
        userId?:number|string| undefined
}



 interface iUserInterface{
login: string,
password: string,
id: number,
quations: Quiz[],

}


export interface InitalState{
        isAuth:boolean,
        userId:number | null,
        users:iUserInterface[],
        quiz:Quiz[]

}


export enum actionName{
        CHECK_IS_AUTH='CHECK_IS_AUTH',
        ADD_NEW_QUEST='ADD_NEW_QUEST'
}



interface iMain{
        type:actionName.CHECK_IS_AUTH,
        payload:validLogin
}

interface addNewQuest{
        type:actionName.ADD_NEW_QUEST,
        payload:Quiz
}

 
export type userReudcers=iMain | addNewQuest