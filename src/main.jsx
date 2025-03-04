import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./componentes/DataProvider/DataProvider.jsx";
import { initialState, reducer } from "./Utility/reducer.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrapping the App component with DataProvider to manage global state */}
    <DataProvider initialState={initialState} reducer={reducer}>
      <App />
    </DataProvider>
  </React.StrictMode>
);