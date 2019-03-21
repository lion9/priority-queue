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
		if (this.size() < this.maxSize) {
			this.heap.push(data, priority);
		} else {
			throw new error('Max size exceeded');
		}
	}


	shift() {
		if (this.size() > 0) {
			return this.heap.pop();
		} else {
			throw new Error('The queue is empty');
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty(); 
	}
}


let q = new PriorityQueue();
const nodes = [
	{ priority: 10, data: 1 },
	{ priority: 20, data: 2 },
	{ priority: 5, data: 3 },
	{ priority: 0, data: 4 },
	{ priority: 8, data: 5 },
	{ priority: 12, data: 6 },
	{ priority: 17, data: 7 },
	{ priority: 15, data: 8 },
];

const expectedData = [2, 7, 8, 6, 1, 5, 3, 4]

nodes.forEach(node => q.push(node.data, node.priority));
for (var i = 0; i < expectedData.length; i++) {
	console.log(q.heap);
	console.log(expectedData[i]);
	console.log(q.shift());
}

module.exports = PriorityQueue;
