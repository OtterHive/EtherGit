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

    refs () {
        let refCount = Number(this.repoContract.refCount());
        let refs = [];
        let event = this.repoContract.CreateRef();
        event.watch((err, result) => {
            if (!err) {
                refs.push(result);
                refCount--;
            }
        });
        return (abort, cb) => {
            if (abort || refCount <= 0) {
                event.stopWatching();
                cb(true);
            } else if (refs.length > 0) {
                let { name, hash } = refs.pop();
                cb(null, { name, hash });
            }
        };
    }

    symrefs () {
        let symrefCount = Number(this.repoContract.symrefCount());
        let symrefs = [];
        let event = this.repoContract.CreateSymRef();
        event.watch((err, result) => {
            if (!err) {
                symrefs.push(String(this.repoContract.refs(result)));
                symrefCount--;
            }
        });
        return (abort, cb) => {
            if (abort || symrefCount <= 0) {
                event.stopWatching();
                cb(true);
            } else if (symrefs.length > 0) {
                let { name, ref } = symrefs.pop();
                cb(null, { name, ref });
            }
        };
    }

    // update (readRefUpdates, readObjects, cb) {
    //     if (readRefUpdates) {
    //         readRefUpdates(null, (abort, { name, new: newVal }) => {
    //             this.repoContract.updateRef(name, newVal, err => {
    //                 if (!err && abort) {
    //                     cb();
    //                 } else if (err) {
    //                     cb(true);
    //                 }
    //             });
    //         });
    //     }
    // }
}

module.exports = Repo;
