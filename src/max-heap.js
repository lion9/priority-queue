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
		this.nodes.push(node);
	}

	pop() {
		if (!this.isEmpty()) {
			this.nodes.pop();
			let detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			if (this.root != null) {
				this.shiftNodeDown(this.root);
			}
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

		this.root = this.parentNodes.pop();
		if (this.root != null) {
			if (this.root.parent != null) {
				// set parent of the this.root to null if its parent was the detached node, else place it into the beginning of parentNodes
				if (this.root.parent === detached) {
					this.parentNodes.unshift(this.root);
				} else {
					this.parentNodes.unshift(this.root.parent);
				}
			}
		}

		if (this.root != null) {
			if (this.root.parent != null) {
				// if the new root was the left child, set the left field of its parent to null
				if (this.root.parent.left != null && this.root.parent.left === this.root) {
					this.root.parent.left = null;
				}
				// if the new root was the right child, set the right field of its parent to null
				if (this.root.parent.right != null && this.root.parent.right=== this.root) {
					this.root.parent.right = null;
				}
			}
		}


		if (this.root != null) {
			this.root.parent = null;
		}


		if (detached.left != null && detached.left != this.root) {
			this.root.left = detached.left;
			this.root.left.parent = this.root;
		}
		if (detached.right != null && detached.right != this.root) {
			this.root.right = detached.right;
			this.root.right.parent = this.root;
		}
		
		
	}

	size() {
		return this.nodes.length;
	}

	isEmpty() {
		return this.parentNodes.length === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.nodes = [];
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
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
		let leftLowerNode;
		let rightLowerNode;
		let nodeToShift;

		if (node.left != null) {
			leftLowerNode = node.left;
		}
		if (node.right != null) {
			rightLowerNode = node.right;
		}
		if (leftLowerNode != null && rightLowerNode != null) {
			nodeToShift = leftLowerNode.priority > rightLowerNode.priority ? node.left : node.right;
		} else if (leftLowerNode != null) {
			nodeToShift = node.left;
		} else if (rightLowerNode != null) {
			nodeToShift = node.right;
		}


		if (nodeToShift != null) {
			if (node.priority < nodeToShift.priority) {

				// Maintain parentNodes[]
				let currentNodePosition = this.parentNodes.indexOf(node);
				let lowerNodePosition = this.parentNodes.indexOf(nodeToShift);

				if (currentNodePosition > -1) {
					this.parentNodes.splice(currentNodePosition, 1, nodeToShift);
				}
				if (lowerNodePosition > -1) {
					this.parentNodes.splice(lowerNodePosition, 1, node);
				}

				if (node === this.root) {
					this.root = nodeToShift;
				}
				// shifting down

				nodeToShift.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}

	hasBothChildren(node) {
		return this.parentNodes[0].left != null && this.parentNodes[0].right != null;
	}
}


const h = new MaxHeap();
h.push(42, 15);
h.push(15, 14);
h.push(0, 16);
h.push(100, 100);

for (let i = 0; i < 4; i++) {
	console.log(h.pop());
}
















// h = new MaxHeap();
//
// h.root = new Node(0, 3);
// h.root.appendChild(new Node(1, 20));
// h.root.appendChild(new Node(2, 7));
// h.root.left.appendChild(new Node(3, 5));
//
// /**
//           3                        20            20
//         /  \                      /  \          /  \
//       20    7  - shift down ->   3    7       5     7
//      /                          /            /
//     5                          5           3
// **/
//
// h.parentNodes = [
// 	h.root.left,
// 	h.root.right,
// 	h.root.left.left,
// ];
//
// const newRoot = h.root.left;
// const newDeepest = h.root;
//
// h.shiftNodeDown(h.root);




// h = new MaxHeap();
//
//
// h.push(1, 10);
// h.push(2, 20);
// h.push(3, 5);
// h.push(4, 0);
// h.push(5, 8);
// h.push(6, 12);
// h.push(7, 17);
// h.push(8, 15);


// { priority: 10, data: 1 },
// { priority: 20, data: 2 },
// { priority: 5, data: 3 },
// { priority: 0, data: 4 },
// { priority: 8, data: 5 },
// { priority: 12, data: 6 },
// { priority: 17, data: 7 },
// { priority: 15, data: 8 },


//
// const expectedData = [2, 7, 8, 6, 1, 5, 3, 4];
//
// for (var i = 0; i < expectedData.length; i++) {
// 	console.log(h.parentNodes);
// 	console.log(h);
// 	console.log(expectedData[i]);
// 	console.log(h.pop());
// }


module.exports = MaxHeap;
