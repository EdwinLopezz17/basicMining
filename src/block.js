const { SHA256 } = require("crypto-js");


const DIFFICULTY = 3;
const MINE_RATE = 3000;

class Block{
    constructor(time, previousHash, hash, data, nonce, difficulty){
            this.time = time;
            this.previousHash = previousHash;
            this.hash = hash;
            this.data = data;
            this.nonce = nonce;
            this.difficulty = difficulty;

    } 

    static get genesis(){
        const time = new Date ('2000-25-07').getTime();
        return new this(
            time,
            undefined,
            'genesisHash',
            'Genesis Block',
            0,
            DIFFICULTY
        )
    }

    static mine(previousBlock, data){
        const {hash: previousHash} = previousBlock;
        let {difficulty} = previousBlock;
        let hash;
        let time;
        let nonce = 0;

        console.log(`Mining block with data: "${data}"...`);

        do{
            time = Date.now();
            nonce += 1;
            difficulty = previousBlock.time + MINE_RATE > time ? difficulty + 1 : difficulty - 1;
            hash = SHA256(previousHash + time + data + nonce + difficulty).toString();

            process.stdout.write(`\rAttempt #${nonce} - Difficulty: ${difficulty}, Hash: ${hash.substring(0, 10)}...`);

        }while(hash.substring(0, difficulty) !== "0".repeat(difficulty));

        console.log(`Block mined with ${nonce} attempts.\n`);

        return new this(time, previousHash, hash, data, nonce, difficulty);
    }

    toString(){
        const {time, previousHash, hash, data, nonce, difficulty} = this;

        return `Block -
            Time: ${time}
            Previous Hash: ${previousHash}
            Hash: ${hash}
            Data: ${data}
            Nonce: ${nonce}
            Difficulty: ${difficulty}
            -----------------------------------------------------
        `
    }
}

module.exports = Block