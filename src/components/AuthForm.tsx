import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { changeIsAuth } from "../redux/actions/main";

import s from "./auth.module.scss";

export interface validLogin {
  login: string | number;
  password: string | number;
}

interface Props {
  showFormBlock: () => void;
  isAuth: boolean;
}

const AuthForm: React.FC<Props> = ({
  showFormBlock,
  isAuth,
}): React.ReactElement => {
  const [validPath, setValidPath] = React.useState<validLogin>({
    login: "admin",
    password: "admin",
  });

  const [valid, setValid] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const chnageShowModal = () => {
    showFormBlock();
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const setValidForm = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ): void => {
    switch (name) {
      case "login": {
        const login = e.target.value.toLocaleLowerCase().replace(/\s/g, "");

        setValidPath({ ...validPath, login: login });

        break;
      }
      case "password": {
        const password = e.target.value.toLocaleLowerCase().replace(/\s/g, "");

        setValidPath({ ...validPath, password: password });

        break;
      }
    }
  };

  const checkForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (validPath.login !== " " && validPath.password !== "") {
      dispatch(changeIsAuth(validPath));
    }
    if (!isAuth) {
      setValid(true);
    }
  };

  return (
    <div className={s.main} onClick={chnageShowModal}>
      <div onClick={stopPropagation}>
        <form onSubmit={checkForm}>
          <div>
            <input
              type="text"
              onChange={(e) => setValidForm(e, "login")}
              value={validPath.login}
            />
          </div>
          <div>
            <input
              type="password"
              onChange={(e) => setValidForm(e, "password")}
              value={validPath.password}
            />
          </div>
          <button> Войти </button>
          {valid && (
            <h3 style={{ color: "red" }}>Пароль или логин не верны </h3>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
