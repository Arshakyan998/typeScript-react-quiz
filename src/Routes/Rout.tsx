import React, { ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router";

import { useTypedSelector } from "../userHooks/useSelector";
import { routes, addQuizRoutes } from "./Route";

function Paths(): ReactElement {
  const { isAuth } = useTypedSelector((state) => state.main);

  return (
    <div>
      <Switch>
        {routes.map((el) => {
          return (
            <Route
              path={el.path}
              component={el.components}
              exact={el.exact}
              key={el.path}
            />
          );
        })}
        {!isAuth && <Redirect to="/" />}
      </Switch>

      {isAuth && (
        <Switch>
          {addQuizRoutes.map((el) => {
            return (
              <Route
                component={el.components}
                path={el.path}
                exact={el.exact}
                key={el.path}
              />
            );
          })}
        </Switch>
      )}
    </div>
  );
}

export default Paths;
