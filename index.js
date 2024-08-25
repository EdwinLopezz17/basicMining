const BlockChain = require("./src/blockchain");



const blockChain = new BlockChain();

for(let i = 0; i<100; i++){
    const block = blockChain.addBlock(`Block #${i+1}`)
    console.log(block.toString());
}



