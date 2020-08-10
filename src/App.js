import React from "react";
import "./styles.css";
import Logger from "./Logger";
import Control from "./Control";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="logger">
          <Logger></Logger>
        </div>
        <div className="control">
          <Control />
        </div>
      </div>
    </div>
  );
}
