const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
	if (isNaN(maxSize)) {
		maxSize = 30;
		}
	this.maxSize = maxSize;
	this.heap = new MaxHeap();
	}

	push(data, priority) {
		this.heap.push(data, priority);
    }


	shift() {
		return heap.pop();
	}

	size() {
		return this.parentNodes.length;
	}

	isEmpty() {
		return (this.parentNodes.length === 0); 
	}
}

module.exports = PriorityQueue;
