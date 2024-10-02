import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GlobalProvider } from "./context/context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);

//  ola ap: xYe0cMTUImB-zKMM2Iyo
// AIzaSyDatFZIUfnsMsRauAVsGRaNPU6tXHKO5zs
