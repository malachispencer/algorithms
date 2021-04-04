/*
MS. 12/02/2021. A linked list is a linear sequence of data structures, connected together via links. The elements of a linked list - 
nodes - are not stored together in sequential memory location like an array, instead the elements are linked together using a
pointer. The first node of a linked list is called the head, the last node of a linked list is called the tail. Each node contains
data and a pointer to the next node in the linked list. The tail node will contain null as its pointer.

Node Class

1) The Node class will represent each element in the linked list.
2) It consists solely of a constructor, where data can be passed in and a next value can be passed in, but the next value will be
   null by default.

Linked List Class

Constructor
1) We bring in the Node class via depedenct injection, because we will be using it a lot in the LinkedList class.
2) The head will essentially store the linked list, by holding the first Node, we set it to null by default, so we will use our
   LinkedList instance methods to populate it with Nodes.
3) We set the size to 0 by default, once again we will update this based on adding and removing Nodes.

insertFirst
1) This is the most simple insertion, the head stores the first Node, which be the first in any size of a linked list.
2) In order to insert a new Node at the beginning, we simply set a new node equal to the head, and then set this new Node's
   next equal to the old/current head.
3) We increment the size of the list, as we've just added a Node.

insertLast
1) This function takes in data, which we pass into a new Node whose next value will be null, because of course, we intend this node to be
   the last Node in the LinkedList.
2) We initialize a variable called current, which will allow us to reassign the value of Node's in our list.
3) We first handle the condition where the LinkedList is empty, or has no head, if so, we simply set the head equal to the node we wanted
   to insert last, and it will be both the first and last Node.
4) If the LinkedList is not empty, we set current equal to the head, which is the first Node. We then create a while loop which runs as
   long as current - which at first is the first Node - points to a Node in its next property.
5) So if current points to another Node in its next property, we set current equal to the Node it points to. We keep doing this until
   current becomes the tail Node, which has null as its next value, at which point the loop is broken out of.
6) We assign the new Node we are inserting to the next property of current. Remember, current is now the tail Node, and we setting its 
   next property to be a new Node which points to null.
7) For example, when this.head = Node { data: 1, next: Node { data: 2, next: Node { data: 3, next: null } } }.
   - Iteration 1: current.next = Node { data: 2, next: Node { data: 3, next: null } } so we make current equal to this.
   - Iteration 2: current.next = Node { data: 3, next: null } so we make current equal to this.
   - Now current.next is null so the loop is broken out of.
   - We then set current.next to equal the new Node, which points to null.
8) The while loop does not change the LinkedList, it merely allows us to move up the list to get current to be the tail Node, then
   outside the while loop we change the tail Node.
9) Finally, we increment the size of the LinkedList.
*/

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor(nodeClass = Node) {
    this.head = null;
    this.size = 0;
    this.nodeClass = nodeClass;
  }

  insertFirst(data) {
    this.head = new this.nodeClass(data, this.head);
    this.size++;
  }

  insertLast(data) {
    let node = new this.nodeClass(data);
    let current;

    if (!this.head) {
      this.head = node;
    } else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node; 
    }

    this.size++;
  }

  insertAt(data, index) {
    if (index === 0) {
      this.insertFirst(data);
      return;
    }

    if (index > this.size) {
      console.log(`Please choose index under or equal to ${this.size}`);
      return;
    }

    const node = new this.nodeClass(data);
    let current;
    let previous;

    current = this.head;
    let count = 0;

    while (count < index) {
      previous = current;
      count++;
      current = current.next;
    }

    node.next = current;
    previous.next = node;
  }
}

const linkedList = new LinkedList();
//linkedList.insertFirst(3);
//linkedList.insertFirst(2); 
linkedList.insertFirst(1);
// linkedList.insertLast(4);
linkedList.insertAt(9, 1)
console.log(linkedList);