/* global require, module */
const process = require('process');
const crypto = require('crypto');
const Web3 = require('web3');

const repoABI = require('../contracts/Repository.json');

function gitHash (obj, data) {
    let hasher = crypto.createHash('sha1');
    hasher.update(obj.type + ' ' + obj.length + '\0');
    hasher.update(data);
    return hasher.digest('hex');
}

class Repo {
    constructor (address, user) {
        let providerAddress = process.env['ETHEREUM_RPC_URL'] || 'http://localhost:8545';
        this.web3 = new Web3(
            new Web3.providers.HttpProvider(providerAddress)
        );
        this.web3.eth.defaultAccount = user || this.web3.eth.coinbase;
        this.repoContract = this.web3.eth.contract(repoABI).at(address);
    }

    refs (prefix) {
        let refs = [];
        let event = this.repoContract.CreateRef({
            refname: RegExp('^' + prefix)
        });
        event.watch((err, result) => {
            if (!err) {
                refs.push(result);
            }
        });
        return (abort, cb) => {
            if (abort) {
                event.stopWatching();
                cb(true);
            } else if (refs.length > 0) {
                let { refname: name, hash } = refs.pop();
                cb(null, { name, hash });
            }
        };
    }
}

module.exports = Repo;
