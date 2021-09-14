import AddNewQuationBlock from "../components/AddNewQuationBlock";
import { Quiz } from "../components/Quiz";

enum components {
  quiz = "/",
  addQuiz = "/addquiz/:id",
}

const routes = [{ path: components.quiz, components: Quiz, exact: true }];

const addQuizRoutes = [
  { path: components.addQuiz, components: AddNewQuationBlock, exact: true },
];

export { routes, addQuizRoutes };
