import { Subject } from 'rxjs';
import React from 'react';

export const messageSubject = new Subject();

export default function LoggerService(category, params) {
  let message = "";
  switch(category) {
    case 'request.start':
      message = `[START] Trip from ${params.reqObj.src} to ${params.reqObj.dest} has started for duration ${Math.abs(params.reqObj.src - params.reqObj.dest)}`;
      break;
    case 'request.end':
      message = `[END] Trip from ${params.reqObj.src} to ${params.reqObj.dest} has come to end after duration ${Math.abs(params.reqObj.src - params.reqObj.dest)}`;
      break;
    case 'request.process':
      message = `[PROCESSING] Trip from ${params.reqObj.src} - ${params.reqObj.dest}`;
      break;
    case 'request.invalid':
      message = `[Invalid] Trip from ${params.reqObj.src} to ${params.reqObj.dest} is an invalid one`;
      break;
    case 'request.blocked':
      message = (<><span style={{color: 'red'}}>[Blocked]</span>Trip from {params.reqObj.src} to {params.reqObj.dest} has been blocked for duration&nbsp; 
        {Math.abs(params.blocker.src - params.blocker.dest)} by trip from {params.blocker.src} - {params.blocker.dest}</>);
      break;
    default:
      message = "All is well!";
  }

  messageSubject.next({msg: message, cat: category});
  // console.log(message);
}