import React, { useState } from "react";
import "./styles.css";

export default function Request(props) {
  const [tripSrc, setTripSrc] = useState(props.src || 0);

  const [tripDest, setTripDest] = useState(props.dest || 0);

  function addRequestField(events) {
    events.persist();
    let event = events;
    props.addRequestField(event);
  }

  function removeRequestField() {
    props.removeRequestField(props.requestNumber);
  }

  function setRequestDat() {
    props.setRequestDat({ src: tripSrc, dest: tripDest, key: props.id });
  }

  return (
    <div className="requestContainer">
      <div className="requestTitle">Request {props.requestNumber}::</div>
      <label>Src: </label>
      <input
        type="text"
        className="srcInput"
        value={tripSrc}
        onChange={(e) =>
          setTripSrc(e.target.value > 0 ? parseInt(e.target.value, 10) : 0)
        }
      />
      <label>Dest: </label>
      <input
        type="text"
        value={tripDest}
        onChange={(e) =>
          setTripDest(e.target.value > 0 ? parseInt(e.target.value, 10) : 0)
        }
        onBlur={(e) => {
          setRequestDat();
        }}
      />
      <button onClick={addRequestField}>+</button>
      <button onClick={removeRequestField}>-</button>
    </div>
  );
}
