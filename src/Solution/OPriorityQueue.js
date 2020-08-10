var OPriorityQ = {
  heap: [1, 3, 36, 2, 19, 25, 100, 17, 7],
  get heapSize() {
    return this.heap.length;
  },

  getSmallest(first, second) {
    return this.heap[first].priorityNumber < this.heap[second].priorityNumber;
  },

  swap(first, second) {
    const temp = this.heap[first];
    this.heap[first] = this.heap[second];
    this.heap[second] = temp;
  },

  sink(parentIndex) {
    while(true) {

      let leftIndex = (2*parentIndex + 1); 
      let rightIndex = (2*parentIndex + 2);
      let smallestAt = leftIndex; // Assumption

      if (rightIndex < this.heapSize && this.getSmallest(rightIndex, leftIndex)) smallestAt = rightIndex;

      if (leftIndex >= this.heapSize || this.getSmallest(parentIndex, smallestAt)) break;

      this.swap(parentIndex, smallestAt);
      parentIndex = smallestAt;
    }
  },

  swim(childIndex) {    
    let parent = (childIndex - 1) / 2;

    while (childIndex > 0 && this.getSmallest(childIndex, parent)) {
      this.swap(parent, childIndex);
      childIndex = parent;
      parent = (childIndex - 1) / 2;
    }
  },
  
  heapifyMinHeap() {
    for(var parentIndex = Math.max(0, Math.floor((this.heapSize - 2)/2)); parentIndex >= 0; parentIndex -= 1) {
      this.sink(parentIndex);
    }

    return this.heap;
  },

  removeFromMinHeap() {
    
    this.swap(this.heapSize - 1, 0);
    let removedElem = this.heap.pop();

    // Return if minHeap has only no elements after pop
    if(this.heapSize === 0) return removedElem;

    this.sink(0);

    return removedElem;
  },

  /* Currently don't see the need of this function as Adding to dependent arrays by push takes O(1) and state of minHeap would change by the time dependents are unblocked */
  addToMinHeap(node) {
    this.heap.push(node);

    this.swim(this.heapSize);

    return this.heap;
  }
}

export default OPriorityQ;