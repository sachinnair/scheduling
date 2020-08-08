import React, { useState } from "react";
import "./styles.css";

export default function Request(props) {
  const [tripSrc, setTripSrc] = useState(props.src || 0);

  const [tripDest, setTripDest] = useState(props.dest || 0);

  function addRequest(events) {
    events.persist();
    let event = events;
    props.addRequest(event, { src: tripSrc, dest: tripDest });
  }

  function removeRequest() {
    props.removeRequest(props.requestNumber);
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
      />
      <button onClick={addRequest}>+</button>
      <button onClick={removeRequest}>-</button>
    </div>
  );
}
