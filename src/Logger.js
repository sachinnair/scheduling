import React, { useState, useEffect } from 'react';
import { messageSubject } from './Solution/LoggerService';

import "./styles.css";

export default function Logger() {
  const [messages, setMessages] = useState([]);
  const [filterElems, setFilterElems] = useState([]);

  useEffect(() => {
    let msgObserver = messageSubject.subscribe({
      next: (message) => {
        setMessages(messages => [message, ...messages]);
      }
    })

    return () => msgObserver.unsubscribe();
  });

  function clearMessages() {
    return setMessages([]);
  }

  function setFilters(e) {
    const localFilterElems = [ ...filterElems ];
    let checkFor = '';
    
    switch(e.target.name) {
      case "startFilter":
        checkFor = 'request.start';
        break;
      case "endFilter":
        checkFor = 'request.end';
        break;
      case "blockedFilter":
        checkFor = 'request.blocked';
        break;
      case "processFilter":
        checkFor = 'request.process';
        break;
      case "invalidFilter":
        checkFor = 'request.invalid';
        break;
      default:
    }

    if(e.target.checked) {
      localFilterElems.push(checkFor);
    } 
    else {
      let findIndex = localFilterElems.indexOf(checkFor)
      localFilterElems.splice(findIndex, 1)
    }
    
    setFilterElems(localFilterElems);
  }

  return (<> 
    <button onClick={clearMessages}>Clear Logs</button>
    <div className="filterHolder">
      Filters:
      <label htmlFor="startFilter">[START]</label><input type='checkbox' name="startFilter" onChange={setFilters}/>
      <label htmlFor="endFilter">[END]</label><input type='checkbox' name="endFilter" onChange={setFilters}/>
      <label htmlFor="blockedFilter">[Blocked]</label><input type='checkbox' name="blockedFilter" onChange={setFilters}/>
      <label htmlFor="processFilter">[Processing]</label><input type='checkbox' name="processFilter" onChange={setFilters}/>
      <label htmlFor="invalidFilter">[Invalid]</label><input type='checkbox' name="invalidFilter" onChange={setFilters}/>
    </div>
    { Array.isArray(messages) && messages.filter(x => ((filterElems.length && (filterElems.indexOf(x.cat) >= 0)) || filterElems.length === 0))
                                          .map(x => <p>{x.msg}</p>) } 
  </>)
}