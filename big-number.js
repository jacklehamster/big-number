class BigNumberChunk {
  constructor() {
    this.value = 0;
    this.next = null;
  }
}

class BigNumber {
    constructor() {
      this.head = new BigNumberChunk();
    }
}
