class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			node.parent = this;
		} else if (this.right == null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left == node) {
			this.left.parent = null;
			this.left = null;
		} else if (this.right == node) {
			this.right.parent = null;
			this.right = null;
		} else {
			throw new error('Not a child');
		}
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent != null) {
			var oldThis = this;
			var oldThisParent = this.parent;
			var oldThisLeftChild = this.left;
			var oldThisRightChild = this.right;

			var oldParent = this;
			var oldsParentParent = this.parent.parent;
			var oldsParentLeft = this.parent.left;
			var oldsParentRight = this.parent.right;

			if (oldThisParent.left == this) {
				
				// !!!!! maintains correct state of parent.parent.left and parent.parent.right
				if (this.parent.parent != null && this.parent.parent.left == this.parent) {
					this.parent.parent.left = this;
				}
				if (this.parent.parent != null && this.parent.parent.right == this.parent) {
					this.parent.parent.right = this;
				}



				// ????? updates parent field of this' children
				if (this.left != null) {
					this.left.parent = this.parent;
				}
				if (this.right != null) {
					this.right.parent = this.parent;
				}


				
				/// !!!! updates parent.child.parent
				if (this.parent.right != null) {
					this.parent.right.parent = this;
				}
				if (this.parent.left != null) {
					this.parent.left.parent = this;
				}

				// !!!!! updates child.parent
				if (this.parent.parent != null) {
					this.parent = this.parent.parent;
				}



				// !!!! updates parent.parent.parent
				this.parent = oldThisParent.parent;
				this.left = oldThisParent;
				this.right = oldThisParent.right;
				this.left.left = oldThisLeftChild;
				this.left.right = oldThisRightChild;
				this.left.parent = this;

				
				
			} else if (oldThisParent.right == this) {
				
				// !!!!! maintains correct state of parent.parent.left and parent.parent.right
				if (this.parent.parent != null && this.parent.parent.left == this.parent) {
					this.parent.parent.left = this;
				}
				if (this.parent.parent != null && this.parent.parent.right == this.parent) {
					this.parent.parent.right = this;
				}



				// ?????? updates parent field of this' children
				if (this.left != null) {
					this.left.parent = this.parent;
				}
				if (this.right != null) {
					this.right.parent = this.parent;
				}


				/// !!!! updates parent.child.parent
				if (this.parent.left != null) {
					this.parent.left.parent = this;
				}
				if (this.parent.right != null) {
					this.parent.right.parent = this;
				}
				

				// !!! updates child.parent
				if (this.parent.parent != null) {
					this.parent = this.parent.parent;
				}

				// !!!! updates parent.parent.parent

				this.parent = oldThisParent.parent;
				this.right = oldThisParent;
				this.left = oldThisParent.left;
				this.right.left = oldThisLeftChild;
				this.right.right = oldThisRightChild;
				this.right.parent = this;

			}

			console.log(this);


		}
	}
}

// const root = new Node(1, 1);
// const left = new Node(2, 2);
// const right = new Node(3, 3);
// const childOfLeft = new Node(4, 4);

// root.appendChild(left);
// root.appendChild(right);
// left.appendChild(childOfLeft);

// left.swapWithParent();


var node10 = new Node(10, 10);
var node6 = new Node(6, 6);
var node9 = new Node(9, 9);
var node3 = new Node(3, 3);
var node2 = new Node(2, 2);
var node1 = new Node(1, 1);
var node7 = new Node(7, 7);
node10.appendChild(node6); // root node
node10.appendChild(node9);

node6.appendChild(node3); // level 2 node
node6.appendChild(node1);
node9.appendChild(node2);
node9.appendChild(node7);

node9.swapWithParent();

module.exports = Node;

