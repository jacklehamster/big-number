class BigNumberChunk {
  constructor(left, right) {
    this.value = 0;
    this.left = left || null;
    this.right = right || null;
    if (this.left) {
      this.left.right = this;
    }
    if (this.right) {
      this.right.left = this;
    }
  }
}

class BigNumber {
    constructor() {
      this.tail = this.head = new BigNumberChunk();
    }
  
    increment() {
      this.tail.value++;
      this.fix(this.tail);
    }
  
    double() {
      this.head.value *= 2;
      this.fix(this.head);
    }
  
    copy() {
      const newNumber = new BigNumber();
      let newNode = newNumber.head;
      for (let node = this.head; node; node = node.right) {
        newNode.value = node.value;
        if (node.right) {
          newNode = new BigNumberChunk(newNode, null);
        }
      }
      return newNumber;
    }
  
    toString() {
      let s = "";
      for(let node = this.head; node; node = node.right) {
        s += node===this.head ? node.value : (node.value + 1000000).toString().substr(1);
      }
      return s;
    }
  
    fix(node) {
      while(node.value > 1000000) {
        if (!node.left) {
          this.head = new BigNumberChunk(null, node);
        }
        node.left.value += Math.floor(node.value / 1000000);
        node.value = node.value % 1000000;
        node = node.left;
      }
      while(this.head.value === 0 && this.head.next) {
        this.head = this.head.next;
      }
    }
}
