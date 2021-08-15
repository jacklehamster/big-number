class BigNumberChunk {
  constructor() {
    this.value = 0;
    this.right = null;
    this.left = null;
  }
}

class BigNumber {
    constructor() {
      this.tail = this.head = new BigNumberChunk();
    }
  
    increment() {
      this.tail.value++;
      this.fixTail();
    }
  
    toString() {
      let s = "";
      for(let node = this.head; node; node = node.right) {
        s += node===this.head ? node.value : (node.value + 1000000).toString().substr(1);
      }
      return s;
    }
  
    fixTail() {
      let node = this.tail;
      while(node.value > 1000000) {
        if (!node.left) {
          node.left = new BigNumberChunk();
          node.left.right = node;
          this.head = node;
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
