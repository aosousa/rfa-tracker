import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { App } from "./App";
import "./index.css";

import { fetchBodyparts } from "./features/bodyparts/bodypartsSlice";
import { fetchMoves } from "./features/moves/movesSlice";
import { fetchMoveCategories } from "./features/moveCategories/moveCategoriesSlice";

const start = async () => {
  const container = document.getElementById("root")!;
  const root = createRoot(container);

  // load all needed data at the start
  store.dispatch(fetchBodyparts());
  store.dispatch(fetchMoves());
  store.dispatch(fetchMoveCategories());

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

start();
