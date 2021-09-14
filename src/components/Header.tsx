import React from "react";

import { useTypedSelector } from "../userHooks/useSelector";
import AuthForm from "./AuthForm";
import downArrow from "../assets/down.svg";
import upArrow from "../assets/up.svg";

import s from "./auth.module.scss";
import { useHistory } from "react-router";

const Header = () => {
  const { isAuth, userId, users, quiz } = useTypedSelector(
    (state) => state.main
  );
  const [authForm, setAuthForm] = React.useState<boolean>(false);
  const [showAddMenu, setShowAddMenu] = React.useState<boolean>(false);
  const history = useHistory();
  const showFormBlock = (): void => {
    setAuthForm((prev) => !prev);
  };

  const serchQurrentUser: any =
    isAuth && users.find((element) => element.id === userId);

  React.useEffect(() => {
    if (isAuth) {
      setAuthForm((prev) => !prev);
    }
  }, [isAuth]);

  const changeShowMenu = () => {
    setShowAddMenu((prev) => !prev);
  };

  return (
    <header className={s.header}>
      {!isAuth ? (
        <button onClick={showFormBlock} className={s.header_btn}>
          Войти
        </button>
      ) : (
        <div>
          {
            <div className={s.header_profile} onClick={changeShowMenu}>
              Добро пожаловать : {serchQurrentUser.login}
              <img
                src={showAddMenu ? downArrow : upArrow}
                width="25px"
                height="25px"
              />
              <span>{quiz.length} Вопросов </span>
              <ul style={{ visibility: showAddMenu ? "visible" : "hidden" }}>
                <li onClick={() => history.push(`/addquiz/${userId}`)}>
                  Добавить квиз
                </li>
              </ul>
            </div>
          }
        </div>
      )}
      {authForm && <AuthForm showFormBlock={showFormBlock} isAuth={isAuth} />}
    </header>
  );
};

export default Header;
