import React from "react";
import { Subject } from "rxjs";

export var clickObserver = new Subject();

export default function Submissions() {
  function triggerObserver() {
    return clickObserver.next("Time for action");
  }

  return (
    <>
      <button onClick={triggerObserver}>Submit</button>
    </>
  );
}
