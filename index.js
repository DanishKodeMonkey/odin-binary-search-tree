/* Problem statement: 

Given a sorted integer array of length n, 
create a balance Binary Search Tree(BST) 
using the elements of the array

A BST is balanced when the 
height of left subtree and right subtree of root differ by at most 1

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
    tree class should have a buildTree method
        buildTree(array) should split the given array into
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
