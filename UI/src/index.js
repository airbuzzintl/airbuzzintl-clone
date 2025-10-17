import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/animation.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { LocationProvider } from "./controller/constant/LocationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <LocationProvider>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        limit={3}
        pauseOnHover={false}
        theme="light"
        style={{ padding: "1%" }}
      />
    </LocationProvider>
  </BrowserRouter>
);

reportWebVitals();
