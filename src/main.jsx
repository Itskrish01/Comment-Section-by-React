import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CommentProvider from "./ContextComment";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CommentProvider>
    <App />
  </CommentProvider>
);
