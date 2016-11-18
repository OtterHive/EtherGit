/* global web3:true */
import Web3 from 'web3';

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}
web3.eth.defaultAccount = web3.eth.coinbase;

export default web3;
