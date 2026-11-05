import React from "react";
import ReactDOM from "react-dom/client";
import { initialTripHash } from "./utils/initialTripHash";
import App from "./App";
import "./styles.css";
// Fresh page loads always begin on December 10; in-app navigation keeps its day query.
window.history.replaceState(
  null,
  "",
  window.location.pathname +
    window.location.search +
    initialTripHash(window.location.hash),
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
