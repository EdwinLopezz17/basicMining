const Block = require("./block");



class BlockChain{
    constructor(){
        this.chain = [Block.genesis];

    }

    addBlock(data){
        const previousBlock = this.chain[this.chain.length-1]
        const block = Block.mine(previousBlock, data);

        this.chain.push(block);
        return block;
    }
}

module.exports = BlockChain