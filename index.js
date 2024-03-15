/* Problem statement: 

Create a Binary Search Tree(BST) 
using the elements of an array

A BST always lines lesser values to the left of a root/node, 
and higher values to the right
*/

/* Psuedo-code approach. 
For the purposes of this pseudo-code, we will assume the array provided
is as follows:

arr = [1,2,3,4,5,6,7,8,9]

The algorithmn to form the BST should do the following:
Initialize the start and end point of the array
start = 0, end = length of array -1

Define a middle point to use as the root of the tree

mid = (start+end)/2

We now have two arrays with a mid point
left = [1,2,3,4] mid = 5, right = [6,7,8,9]
Create a tree node with mid as root

Do this recursively:
calculate mid of left subarray
define mid of sub-array as root of sub-array
initialize start and end point of sub-array
start = 0, end = length of array - 1

Define middle point to use as root for the sub-array
mid = (start+end)/2

we now have two arrays with a mid point
left = [1], mid = 2, right = [3, 4]

Do the same for the right sub-array. And repeat...

If the length of a sub-array is 1,
set the single value as mid for that node (leaf)

Continue this until all branches of the tree 
has reached and set a leaf(single value array)
*/

/* Part 2 
Will need a Node class to create new nodes easily, 
accepting root(mid point) as parameter
    each node will have a root
        root = root(mid point)
    a left array, starting as null
        left = null
    a right array, starting as null
        right = null


Will need a class for the tree  
    tree class should sort a given array with merge sort algo before proceeding
    tree class should have a buildTree method
        buildTree(array) should split the given array into
        buildTree should run through array and remove duplicate items (e.g two 4s found.).
            leftArray, mid and rightArray
            leftArray, mid and Right array is made using recBuildBranch(array)
                Establish base case
                    if(start>end) return null;

                define a mid point from array
                    mid = array.length / 2
                Form new sub arrays
                    leftArray = array.splice(0, mid)
                    rightArray = array.splice(mid)
                establish new node from array root using node class
                    root = new Node(mid)
                        this results in node with root set ot mid
                        left set to null
                        right set to null
                    set root.left to recursively start recBuildBranch(array) again
                        root.left = recBuildBranch(leftArray)
                        root.right = recBuildBranch(rightArray)
                    return root
        create final tree(initialise recursion)
            finalTree = recBuildBranch(array)
        set finalTree as root of this tree
            this.root = finalTree
        return finalTree           
*/

class Node {
	constructor(data, left = null, right = null) {
		this.data = data
		this.left = left
		this.right = right
	}
}

class Tree {
	constructor(array) {
		this.array = array
		// To clarify, a root is defined with the following:
		// an array that has had it's duplicates removed [...new Set(array)]
		// an array with no duplicates that has been sorted mergeSort(array)
		// making a glorious nested operation to build the tree upon.
		this.root = this.buildTree([...new Set(mergeSort(array))])
	}
	// Method for building a tree
	buildTree(array) {
		console.log(`buildTree(array) received: ${array}`)
		if (array.length < 1) return null

		const mid = Math.floor(array.length / 2)
		const root = new Node(array[mid])

		root.left = this.buildTree(array.slice(0, mid))
		root.right = this.buildTree(array.slice(mid + 1))

		// return level 0 root node
		return root
	}
	// Method returning the node with the given value
	find(value) {
		let node = this.root

		// While node is not null(leaf reached)
		while (node) {
			// recursively search for matching node.data
			if (value < node.data) {
				node = node.left // traverse left
			} else if (value > node.data) {
				node = node.right // traverse right
			} else {
				// if not found, then node.data === value
				return node
			}
		}
		return null // Node with value not found.
	}

	// method returning an array of values from the tree if no callback is given
	// if a callback is given, the related callback will handle returning an array.
	// traverse the tree in breadth-first level order
	levelOrder(callback) {
		// If no root, return
		if (!this.root) return

		let result = []
		// initialise the queue starting with root.
		const queue = [this.root]

		// as long as there are values in the queue
		while (queue.length) {
			// Resolve the first value in the queue
			const node = queue.shift()
			// if a callback is provided
			if (callback) {
				// pass node and resolve through callback
				callback(node, result)
			} else {
				// if no callback is provided, pass simply pass to array.
				result.push(node.data)
			}
			// pass next values to queue
			if (node.left) queue.push(node.left)
			if (node.right) queue.push(node.right)
		}
		// continue this until no left or right values can be queued or passed.
		// return final array
		return result
	}

	// callback function for in-order traversal
	inOrder(node = this.root, result = []) {
		// base case, return result
		if (!node) {
			return result
		}
		// Traverse left subtree
		function traverse(node, result) {
			if (node) {
				traverse(node.left, result)
				result.push(node.data)
				traverse(node.right, result)
			}
		}
		traverse(node, result)
		return result // Return the result array
	}
	// callback function for in-order traversal
	preOrder(node = this.root, result = []) {
		// base case, return result
		if (!node) {
			return result
		}
		// Traverse left subtree
		function traverse(node, result) {
			if (node) {
				result.push(node.data)
				traverse(node.left, result)
				traverse(node.right, result)
			}
		}
		traverse(node, result)
		return result // Return the result array
	}
	// callback function for in-order traversal
	postOrder(node = this.root, result = []) {
		// base case, return result
		if (!node) {
			return result
		}
		// Traverse left subtree
		function traverse(node, result) {
			if (node) {
				traverse(node.left, result)
				traverse(node.right, result)
				result.push(node.data)
			}
		}
		traverse(node, result)
		return result // Return the result array
	}

	// Method for inserting a value into an already built tree
	insert(value) {
		// Create a new node from value
		const node = new Node(value)

		// If tree is empty
		if (this.root === null) {
			this.root = node
			return
		}

		// If tree is not empty
		let currentNode = this.root
		while (currentNode) {
			// Check less than conditions ( left traversal )
			if (value < currentNode.data) {
				// if left is null, insert new node( leaf found )
				if (!currentNode.left) {
					currentNode.left = node
					return
				}
				// if node is not null, continue traversing
				currentNode = currentNode.left
			} else if (value > currentNode.data) {
				// Check bigger than conditions( right traversal)
				if (!currentNode.right) {
					// If no node is found, insert new node ( leaf found )
					currentNode.right = node
					return
				}
				// if not, move right
				currentNode = currentNode.right
			} else {
				// if a given value is the same as a nodes, replace the value in the node
				currentNode.data = node.data
				return
			}
		}
	}
	// Method returning the given nodes height.( longest distance from node to edge leaf in tree )
	height(node) {
		//base case
		if (!node) return 0

		let leftPath = this.height(node.left)
		let rightPath = this.height(node.right)
		return leftPath > rightPath ? leftPath + 1 : rightPath + 1
	}

	// method returning depth of given node ( longest distance to root of tree )
	depth(node, root = this.root) {
		// If the value of root is the value of the node, then its the root.
		if (root.value === node.value) return 0

		// if the value of the node is less than the roots, traverse left
		// add 1 to the depth for each recursion.
		if (node.value < root.value) return this.depth(root.left, node) + 1
		// otherwise, it's greater than root, and traverse right,
		// adding 1 to the depth for each traversal
		return this.depth(root.right, node) + 1
	}
	isBalanced(node = this.root) {
		// base case, if node is null, return true.
		if (!node) {
			return true
		}
		// Determine the heights of both the left and right branches
		const leftHeight = this.height(node.left)
		const rightHeight = this.height(node.right)
		// check if the absolute difference between leftHeight and rightHeight is <= 1
		// if so, the tree is uneven.
		if (Math.abs(leftHeight - rightHeight) <= 1) {
			// if this check pass, then it's even. Check this recursively.
			// if it fails at any time, then it's uneven.
			return this.isBalanced(node.left) && this.isBalanced(node.right)
		} else {
			return false
		}
	}
	// Method for deleting a given value from the tree
	// accepts a value, and optionally a node(starting at root for recursive call)
	deleteItem(value, node = this.root) {
		// base case for recursive call
		// if node is null, return the node. The value does not exist.
		if (!node) {
			return node
		}

		// Compare value with node, recursively.
		// if value is less than node.data, traverse left.
		if (value < node.data) {
			node.left = this.deleteItem(value, node.left)
			// if value is more than node.data, traverse right.
		} else if (value > node.data) {
			node.right = this.deleteItem(value, node.right)
		} else {
			//if none of the above cases match, then we have found the node to be deleted.

			// Now to check for child nodes.
			// If single child node, return said child.
			// this effectively removes the node from the tree.
			if (!node.left) {
				return node.right
			}
			if (!node.right) {
				return node.left
			}

			/* 
            Ok I found some material that guided me a bit on this one, it was tough!!
            but this is how I understood the process:

			 if the node has two children, find the inorder sucessor
			 inorder sucessor = smallest node in right subtree.
                This is done using a helper function
                        
			 node.data is now set to the returned value, the inorder-sucessor.
			 At this point the old node is deleted, and replaced with its inorder-successor. 
             */
			node.data = this.findMinValue(node.right).data
			/*
			 now, recursively delete the inorder sucessor, from the new nodes right tree
			 to preserve the binary tree structure.
            */
			node.right = this.deleteItem(node.data, node.right)
		}
		// return the updated node.
		return node
	}
	// helper function for finding the smallest node in a subtree
	findMinValue(node) {
		// while node.left is not null
		while (node.left) {
			// traverse left
			node = node.left
		}
		// return left-most node (minimum)
		return node
	}
}

// Implementing mergeSort from previous endavours to help with sorting arrays.
function mergeSort(array) {
	// return array if it is only 1 value
	if (array.length === 1) return array

	// determine mid point index of array
	const mid = Math.floor(array.length / 2)

	// split array
	let left = array.slice(0, mid)
	let right = array.slice(mid, array.length)

	left = mergeSort(left)
	right = mergeSort(right)

	return merge(left, right)
}

function merge(left, right) {
	// Final sorted array to be returned
	const merged = []

	while (left.length > 0 && right.length > 0) {
		if (left[0] < right[0]) {
			merged.push(left[0])
			left.shift()
		} else {
			merged.push(right[0])
			right.shift()
		}
	}
	while (right.length > 0) {
		merged.push(right[0])
		right.shift()
	}
	while (left.length > 0) {
		merged.push(left[0])
		left.shift()
	}
	return merged
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node === null) {
		return
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
	}
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

let tree = new Tree(arr)
prettyPrint(tree.root)

tree.insert(6969)
prettyPrint(tree.root)

tree.deleteItem(6969)
prettyPrint(tree.root)

console.log(tree.find(23))

console.log(tree.levelOrder(tree.inOrder))
console.log(tree.levelOrder(tree.preOrder))
console.log(tree.levelOrder(tree.postOrder))

console.log(tree.height(tree.find(8)))
console.log(tree.height(tree.find(6345)))
console.log(tree.isBalanced())

tree.insert(7001)
tree.insert(7002)
tree.insert(7003)
tree.insert(7004)
tree.insert(7005)
tree.insert(7006)
tree.insert(7007)
tree.insert(7008)
tree.insert(7009)
tree.insert(7010)
prettyPrint(tree.root)
console.log(tree.isBalanced())
