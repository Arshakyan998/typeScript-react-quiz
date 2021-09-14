import { InitalState, userReudcers, actionName } from "../types/Main";

const initalState: InitalState = {
  users: [
    {
      login: "admin",
      password: "admin",
      id: 1,
      quations: [],
    },
  ],
  quiz: [
    {
      qutionText: "Столица США?",
      answersOption: [
        { answerText: "Вашингтон", isTrue: true },
        { answerText: "Бостон", isTrue: false },
        { answerText: "Элинойс", isTrue: false },
        { answerText: "Лос-Анджелес", isTrue: false },
      ],
    },
    {
      qutionText: "Что не относится к марвелл?",
      answersOption: [
        { answerText: "Железный человек", isTrue: false },
        { answerText: "Тор", isTrue: false },
        { answerText: "Бэтмен", isTrue: true },
        { answerText: "Человек паук", isTrue: false },
      ],
    },

    {
      qutionText: "Какое животное не является домашним?",
      answersOption: [
        { answerText: "Бегемот", isTrue: true },
        { answerText: "Кот", isTrue: false },
        { answerText: "Собака", isTrue: false },
        { answerText: "Корова", isTrue: false },
      ],
    },
    {
      qutionText: "Какой цвет кожи у Майкла Джексона?",
      answersOption: [
        { answerText: "черный", isTrue: true },
        { answerText: "белый", isTrue: false },
      ],
    },
    {
      qutionText: "Сколько звезд на флаге США?",
      answersOption: [
        { answerText: "44", isTrue: false },
        { answerText: "50", isTrue: true },

        { answerText: "55", isTrue: false },
        { answerText: "39", isTrue: false },
      ],
    },
  ],

  isAuth: false,
  userId: null,
};

export const main = (
  state = initalState,
  action: userReudcers
): InitalState => {
  switch (action.type) {
    case actionName.CHECK_IS_AUTH: {
      const usersItem = [...state.users];
      let isAuth = false;
      const newItem = usersItem.find((element) => {
        if (
          element.login.toLocaleLowerCase() === action.payload.login &&
          element.password.toLocaleLowerCase() === action.payload.password
        ) {
          isAuth = true;
          return element;
        }
      });

      return {
        ...state,
        isAuth: isAuth,
        userId: newItem ? newItem.id : null,
      };
    }

    case actionName.ADD_NEW_QUEST: {
      const { userId } = action.payload;
      const id = userId && +userId;

      let addNewQuiz = false;

      const newItem = [...state.users].filter((el) => {
        if (el.id === id) {
          el.quations.push(action.payload);
          addNewQuiz = true;
        }

        return el;
      });
      const filterdQuiz=[...state.quiz].filter(el=>{
        
          el.answersOption.filter(Boolean)
         return el
      })
      const newQuiz = [...new Set(filterdQuiz), action.payload];
       
      return {
        ...state,
        users: newItem,
         quiz: addNewQuiz ? newQuiz : state.quiz,
      };
    }
    default:
      return state;
  }
};
