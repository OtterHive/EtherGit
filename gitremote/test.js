/* global require */
const Web3 = require('web3');
const process = require('process');

const repoABI = require('../contracts/Repository.json');
let providerAddress = process.env['ETHEREUM_RPC_URL'] || 'http://localhost:8545';

const web3 = new Web3(
    new Web3.providers.HttpProvider(providerAddress)
);

const repoContract = web3.eth.contract(repoABI).at('0xcCc6799EBe3d84b6c4f7fF2755840fe819912071');
repoContract.refCount((err, result) => {
    if (!err) {
        console.log(Number(result));
    }
});
console.log(repoContract.getRef.call('doge'));
