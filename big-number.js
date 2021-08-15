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
      this.chunks = 1;
    }
  
    increment(num) {
      this.tail.value+= (num || 1);
      this.fix(this.tail);
      return this;
    }
  
    mul(value) {
      for (let node = this.head; node; node = node.right) {
        node.value *= value;
      }
      this.fix(this.tail);
      return this;
    }
  
    add(number) {
      for (let node1 = this.tail, node2 = number.tail; node1 || node2; node1 = node1.left, node2 = node2.left) {
        node1.value += node2.value;
      }
      this.fix(this.tail);
      return this;
    }
  
    half() {
      for(let node = this.head; node; node = node.right) {
        if (node.value % 2 === 1 && node.right) {
          node.right.value += 500000;
        }
        node.value >>= 1;
      }
      return this;
    }
  
    odd() {
      return this.tail.value % 2 === 1;
    }
  
    even() {
      return this.tail.value % 2 === 0;
    }
  
    compare(num) {
      if (this.chunks < num.chunks) {
        return 1;
      } else if (this.chunks > num.chunks) {
        return -1;
      }
      for (let node1 = this.head, node2 = number.head; node1 || node2; node1 = node1.right, node2 = node2.right) {
        if (node1.value < node2.value) {
          return 1;
        } else if (node1.value > node2.value) {
          return -1;
        }
      }
      return 0;
    }
  
    apply3n1() {
      if (this.odd()) {
        this.mul(3);
        this.increment();
      } else {
        this.half();
      }
      return this;
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
  
    static retrieve(str) {
      const split = str.split("");
      split.reverse();
      const s = split.join("");
      const chunks = str.match(/.{1,6}/g);
      chunks.reverse();
      for (let i = 0; i < chunks.length; i++) {
        let arr = chunks[i] = chunks[i].split("");
        arr.reverse();
        arr = arr.join("");
      }
      const number = new BigNumber();
      let node = number.tail;
      arr.forEach(value => {
        node.value = value;
        node = number.tail = new BigNumberChunk(number.head, null);
        number.chunks++;
      });
      return number;
    }
  
    toString() {
      let s = "";
      for(let node = this.head; node; node = node.right) {
        s += node===this.head ? node.value : (node.value + 1000000).toString().substr(1);
      }
      return s;
    }
  
    fix(node) {
      while(node) {
        if (node.value > 1000000) {
          if (!node.left) {
            this.head = new BigNumberChunk(null, node);
            this.chunks++;
          }
          node.left.value += Math.floor(node.value / 1000000);
          node.value = node.value % 1000000;
        }
        node = node.left;
      }
      while(this.head.value === 0 && this.head.next) {
        this.head = this.head.next;
        this.chunks--;
      }
    }
}
