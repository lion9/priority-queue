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
		if (!this.isEmpty()) {
			let detached = this.detachRoot();
			this.nodes.splice(this.nodes.indexOf(detached), 1);
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			return detached.data;
		}
	}

	detachRoot() {
		if (this.parentNodes.indexOf(this.root) > -1) {
			this.parentNodes.splice(this.parentNodes.indexOf(this.root), 1);
		}
		let oldRoot = this.root;
		this.root = null;
		return oldRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		
		if (!this.isEmpty()) {
			this.root = this.parentNodes.pop();
			var poppedElement = this.root;
			if (poppedElement.parent != detached) {
				this.parentNodes.unshift(poppedElement.parent);
			} else {
				this.parentNodes.unshift(poppedElement);
			}

			this.root.parent = null;

			if (detached.left != null && this.root != detached.left) {
				this.root.left = detached.left;
				this.root.left.parent = this.root;
			}
			if (detached.right != null && this.root != detached.right) {
				this.root.right = detached.right;
				this.root.right.parent = this.root;
			}
		} 
	}

	size() {
		return this.nodes.length;
	}

	isEmpty() {
		return this.parentNodes.length == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.nodes = [];
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
			if (this.hasBothChildren(node)) {
				this.parentNodes.shift();
			}
		}

	}

	shiftNodeUp(node) {
		if (node.parent == null) {
			this.root = node;
		} else {
			if (node.parent != null && node.priority > node.parent.priority) {
				if (node.parent.right != null) {
					var positionOfNode = this.parentNodes.indexOf(node);
					if (positionOfNode >= 0) {
						this.parentNodes.splice(positionOfNode, 1, node.parent);
					} 
				} else {
					var positionOfNode = this.parentNodes.indexOf(node);
					var positionOfParent = this.parentNodes.indexOf(node.parent);
					if (positionOfNode >= 0) {
						this.parentNodes[positionOfNode] = node.parent;
					}
					if (positionOfParent >= 0) {
						this.parentNodes[positionOfParent] = node;
					}
					
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
	}

	shiftNodeDown(node) {
		if(!this.isEmpty()) {
			if (node.left != null && node.right != null && node.priority < node.left.priority || node.left != null && node.right != null && node.priority < node.right.priority) {
				if (node.left.priority > node.right.priority && node.priority < node.left.priority) {
					if (this.root == node) {
						this.root = node.left;
					}
					let currentNodePosition = this.parentNodes.indexOf(node);
					let lowerNodePosition = this.parentNodes.indexOf(node.left);

					if (node.right == null) {
						this.parentNodes.splice(currentNodePosition, 1, node.left);
					}
					if (node.left.right == null) {
						this.parentNodes.splice(lowerNodePosition, 1, node);
					}

					node.left.swapWithParent();
					this.shiftNodeDown(node);
				} else if (node.right.priority > node.left.priority && node.priority < node.right.priority) {
					if (this.root == node) {
						this.root = node.right;
					}
					node.right.swapWithParent();
					this.shiftNodeDown(node);
				}
			} else {
				if (node.right == null && node.left != null && node.priority < node.left.priority) {
					if (this.root == node) {
						this.root = node.left;
					}

					let currentNodePosition = this.parentNodes.indexOf(node);
					let lowerNodePosition = this.parentNodes.indexOf(node.left);

					if (node.right == null) {
						this.parentNodes.splice(currentNodePosition, 1, node.left);
					}
					if (node.left.right == null) {
						this.parentNodes.splice(lowerNodePosition, 1, node);
					}

					node.left.swapWithParent();
					this.shiftNodeDown(node);
				} else if (node.left == null && node.right != null && node.priority < node.right.priority) {
					if (this.root == node) {
						this.root = node.right;
					}

					let currentNodePosition = this.parentNodes.indexOf(node);
					let lowerNodePosition = this.parentNodes.indexOf(node.left);

					if (node.right == null) {
						this.parentNodes.splice(currentNodePosition, 1, node.left);
					}
					if (node.left.right == null) {
						this.parentNodes.splice(lowerNodePosition, 1, node);
					}

					node.right.swapWithParent();
					this.shiftNodeDown(node);
				}
			}
		}
	}

	hasBothChildren(node) {
		return this.parentNodes[0].left != null && this.parentNodes[0].right != null;
	}
}


const h = new MaxHeap();

h.push(15, 42);
h.push(13, 0);
h.push(14, 100);


h.size();

module.exports = MaxHeap;
