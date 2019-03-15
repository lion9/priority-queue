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
		this.heap(data, priority);
    }


	shift() {
		return heap.pop();
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return (this.length === 0); 
	}
}

module.exports = PriorityQueue;
