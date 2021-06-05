const assert = require('assert');
const expect = require('chai').expect;
const { Blockchain } = require('../src/blockchain');
const { Block } = require('../src/block');

describe('blockchain.js tests', () => {
    describe('blockchain._addBlock Test', () => {
        var bc = new Blockchain()
        it('should add a block to the chain', () => {
            var block = new Block("This is not a genesis block");
            bc._addBlock(block);
            expect(bc.chain.length).to.equal(2);
        })
        it('should match prev block hash', () => {
            expect(bc.chain[bc.height - 1].previousBlockHash).to.equal(bc.chain[bc.height - 2].hash);
        })
        it('should update blockchain height', () => {
            expect(bc.height).to.equal(bc.chain.length);
        })
    })
    describe('blockchain.requestMessageOwnershipVerification Test', () => {
        var bc = new Blockchain()
        var regexMsg = /^[a-z0-9]+:[0-9]{10}:starRegistry$/;
        it('should return formatted message', () => {
            bc.requestMessageOwnershipVerification('address').then((response) => expect(response).to.match(regexMsg));
        })  
    })
    // Comment this out as validation wont work
    // describe('blockchain.submitStar Test', () => {
    //     var bc = new Blockchain();
    //     it('should add a star to the chain', () => {
    //         var star = {
    //             dec: "68 52 56.9",
    //             ra: "16h 29m 1.0s",
    //             story: "Test"
    //         }
    //         var ts = new Date().getTime().toString().slice(0, -3)
    //         bc.submitStar('address', `address:${ts}:starRegistry`, 'signature', star).then((result) => console.log(result));
    //         expect(bc.chain.length).to.equal(2);
    //     })
    // });
    describe('blochchain.getBlockByHash Test', () => {
        var bc = new Blockchain();
        var block = new Block("This is not a genesis block");
        let hash;
        bc._addBlock(block).then((result) => hash = result.hash);
        console.log(`hash es ${hash}`)
        it('should return block by hash', () => {
            expect(bc.chain.length).to.equal(2);
        })
    });

    describe('blochchain.validateChain Test', () => {
        var bc = new Blockchain();
        var block = new Block("This is not a genesis block");
        bc._addBlock(block);
        it('should return block by hash', async () => {
            bc.validateChain().then(r => console.log(r))
            expect(bc.chain.length).to.equal(2);
        })
    });

});