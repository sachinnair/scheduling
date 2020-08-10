import CRequest from './CRequest';
import ORoad from './ORoad';
import LS from './LoggerService';
import OPriorityQ from './OPriorityQueue';

var allocations = [];

const MULTIPLIER_FACTOR = 1; // Just for delay purpose

function runRequest(reqObj) {
  if (!(reqObj.src >= ORoad.src &&
        reqObj.src < ORoad.dest &&
        reqObj.dest > ORoad.src &&
        reqObj.dest <= ORoad.dest)) {
    console.log("I think, you are lost!");
    return false;
  }
  if (checkAllocations(reqObj)) {
    reqObj.isActive = true;
    allocations.push(reqObj);
    const tripDuration = Math.abs(reqObj.dest - reqObj.src);
    LS('request.start', {reqObj});

    setTimeout(
      (function (allocatedReqObj) {
        LS('request.end', { reqObj: allocatedReqObj} );

        allocatedReqObj.isActive = false;

        allocatedReqObj.dependents.length && requestFeeder(allocatedReqObj.dependents, true);
      }).bind(null, reqObj)
      , tripDuration * MULTIPLIER_FACTOR
    );

    return true;
  }

  return false;
}

function checkAllocations(reqObj) {
  var allocLength = allocations.length;
  var index = 0;

  let minMilestone;
  let maxMilestone;

  if (reqObj.src < reqObj.dest){
    minMilestone = reqObj.src;
    maxMilestone = reqObj.dest;
  } else {
    minMilestone = reqObj.dest;
    maxMilestone = reqObj.src;
  }

  while (index < allocLength) {
    // detect overlap to throw an error
    if (
      allocations[index].isActive
      && ((minMilestone <= allocations[index].src &&
        maxMilestone > allocations[index].src)
      || (minMilestone > allocations[index].src &&
        minMilestone < allocations[index].dest))
    ) {
      LS('request.blocked', { blocker: allocations[index], reqObj});
      allocations[index].subscribe(reqObj);
      return false;
    }

    index++;
  }
  return true;
}

export default function requestFeeder(requestList, isDependentsList) {
  if (!isDependentsList) {
    const filteredRequestList = [];
    for (const req of requestList) {
      if (req.src - req.dest) {
        filteredRequestList.push(req);
      } else {
        LS('request.invalid', {reqObj : req});
      }
    }
    OPriorityQ.heap = filteredRequestList.map(x => new CRequest(x.src, x.dest, x.key));
  }
  else {
    OPriorityQ.heap = requestList;
  }

  OPriorityQ.heapifyMinHeap();
  while (OPriorityQ.heapSize) {
    var priorityRequest = OPriorityQ.removeFromMinHeap();
    LS('request.process', { reqObj: priorityRequest });
    runRequest(priorityRequest);
  }
}