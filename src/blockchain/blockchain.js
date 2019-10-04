const SHA256 = require('crypto-js/sha256');

class Transaction {

}

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonCe = 0;
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonCe).toString();
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonCe++;
            this.hash = this.calculateHash();
        }
        console.log("Data Mined : " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }
    createGenesisBlock() {
        return new Block(0, "01/01/2019", "Genesis Block", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currenBlock = this.chain[i];
            const previousBlcok = this.chain[i - 1];
            if (currenBlock.hash !== currenBlock.calculateHash()) {
                return false;
            }
            if (currenBlock.previousHash !== previousBlcok.hash) {
                return false;
            }
            return true;
        }
    }
}


// let saveCoin = new Blockchain();


// console.log("Mining Data 1.....");
// saveCoin.addBlock(new Block(1, "02/02/2019", {
//     amount: 12
// }));
// console.log("Mining Data 2.....");
// saveCoin.addBlock(new Block(2, "03/02/2019", {
//     amount: 1
// }));
// console.log("Mining Data 3.....");
// saveCoin.addBlock(new Block(3, "12/02/2019", {
//     amount: 10
// }));
// console.log(saveCoin);
// console.log("Is Dava Valid ? " + saveCoin.isChainValid());

module.exports = Blockchain();
module.exports = Transaction();