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
