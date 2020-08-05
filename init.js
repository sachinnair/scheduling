// Remove variable
var MULTIPLIER_FACTOR = 1000;

function Request(src, dest) {
  this.src = src;
  this.dest = dest;
  this.requestId = new Date();
  this.isActive = false; // This is an important flag. Whenever request is executed isActive is set to true, whenever execution is completed removing the request instance from array would be time consuming thus setting it as inActive and later through batch operations we can remove inActive requests.
  this.dependents = []; // :Request[]
}

Request.prototype.subscribe = function (reqObj) {
  this.dependents.push(reqObj);
};

var Road = {
  src: 0,
  dest: 1000
};

var allocations = [];
var waitQueue = [];

function runRequest(reqObj) {
  if (!(reqObj.src >= Road.src &&
        reqObj.src < Road.dest &&
        reqObj.dest > Road.src &&
        reqObj.dest <= Road.dest)) {
    console.log("I think, you are lost!");
    return false;
  }
  if (checkAllocations(reqObj)) {
    reqObj.isActive = true;
    allocations.push(reqObj);
    const tripDuration = reqObj.dest - reqObj.src;
    console.log(`Trip from ${reqObj.src} to ${reqObj.dest} starts. Blocked for ${tripDuration * MULTIPLIER_FACTOR} millisecs`);

    setTimeout(
      (function (allocatedReqObj, tripDuration) {
        console.log(`Trip from ${allocatedReqObj.src} to ${allocatedReqObj.dest} ends in ${tripDuration}`);

        // allocations[allocations.map(x => x.requestId).indexOf(allocatedReqObj.requestId)].isActive = false;
        allocatedReqObj.isActive = false;

        allocatedReqObj.dependents.forEach(dependentRequest => {
          console.log(`Time to call all requests blocked by me`);
          runRequest(dependentRequest);
        });
      }).bind(null, reqObj, tripDuration * MULTIPLIER_FACTOR)
      , tripDuration * MULTIPLIER_FACTOR
    );

    return true;
  }

  waitQueue.push(reqObj);

  return false;
}

function checkAllocations(reqObj) {
  var allocLength = allocations.length;
  var index = 0;
  while (index < allocLength) {
    console.log('Hi from while loop', allocations[index]);
    // detect overlap to throw an error
    if (
      allocations[index].isActive
      && (reqObj.src <= allocations[index].src &&
        reqObj.dest > allocations[index].src)
      || (reqObj.src > allocations[index].src &&
        reqObj.src < allocations[index].dest)
    ) {
      console.log(`${allocations[index].src} - ${allocations[index].dest} blocks ${reqObj.src} - ${reqObj.dest}`);
      allocations[index].subscribe(reqObj);
      return false;
    }

    index++;
  }
  return true;
}

var req1 = new Request(10, 20);
var req2 = new Request(10, 30);
var req3 = new Request(20, 31);
var req4 = new Request(34, 46);


runRequest(req1);
runRequest(req2);
runRequest(req3);
runRequest(req4);
