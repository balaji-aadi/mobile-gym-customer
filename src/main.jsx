import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/700.css";

import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
