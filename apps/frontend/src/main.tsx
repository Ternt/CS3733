import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import {IntlProvider} from "react-intl";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale='en' defaultLocale="en">
        <App />
    </IntlProvider>
  </React.StrictMode>,
);
