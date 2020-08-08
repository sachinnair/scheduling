import React from "react";
import "./styles.css";
import Control from "./Control";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="logger"></div>
        <div className="control">
          <Control />
        </div>
      </div>
    </div>
  );
}
