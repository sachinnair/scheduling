function CRequest(src, dest, key) {
  this.src = src;
  this.dest = dest;
  this.requestTimestamp = new Date().valueOf(); // Date primitive value is saved
  this.isActive = false; // This is an important flag. Whenever request is executed isActive is set to true, whenever execution is completed removing the request instance from array would be time consuming thus setting it as inActive and later through batch operations we can remove inActive requests.
  this.dependents = []; // :Request[]
  this.key = key;
}

CRequest.prototype.subscribe = function (reqObj) {
  if(this.dependents.map(x => x.key).indexOf(reqObj.key) === -1)
    this.dependents.push(reqObj);
};

CRequest.prototype.thresholdTimeDiff = 100000;

Object.defineProperty(CRequest.prototype, 'priorityNumber', {
  get() {
    /* // To avoid starvation following code could be uncommented
    
    const currentTime = new Date().valueOf();
    const requestWaitingSince = this.requestTimestamp - currentTime;
    if (Math.abs(requestWaitingSince) > this.thresholdTimeDiff) {
      return requestWaitingSince;
    } */
    
    return Math.abs(this.src - this.dest);
  },
})

export default CRequest;