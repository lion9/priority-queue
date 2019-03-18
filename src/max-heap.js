const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.nodes = [];
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {

	}

	detachRoot() {
		this.parentNodes.forEach(element => {
			if (element == this.root) {
				this.parentNodes.splice(this.parentNodes.indexOf(this.root));
			}
		});
		this.root = null;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		console.log(h);
	}

	isEmpty() {
		return this.parentNodes.length == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.allNodes = [];
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.nodes.push(node);
			this.parentNodes.push(node);
		} else {
			this.nodes.push(node);
			this.parentNodes.push(node);
			this.parentNodes[0].appendChild(node);
			if (this.parentNodes[0].left != null && this.parentNodes[0].right != null) {
				this.parentNodes.shift();
			}
		}

	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}


const nodes = [
	new Node(0, 0),
	new Node(1, 1),
	new Node(2, 2),
	new Node(3, 3),
	new Node(4, 4),
	new Node(5, 5),
	new Node(6, 6),
];

h = new MaxHeap();

nodes.forEach(node => {
	h.insertNode(node);
});

module.exports = MaxHeap;
