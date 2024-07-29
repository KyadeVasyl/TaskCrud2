import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./asset/css/normalize.css";
import "./asset/css/index.css";

import App from "./App";
import { i18n } from "./lib/lang";
import Loading from "./common/loading";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
