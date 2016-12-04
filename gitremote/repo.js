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
        let transactionsLeft = Number(this.repoContract.transactionCount());
        let evt;
        let refs = new Promise((resolve) => {
            let refObject = {};
            evt = this.repoContract.allEvents({ fromBlock: 0, toBlock: 'latest' }, (err, result) => {
                let { refname, hash } = result.args;
                refname = this.web3.toAscii(refname.replace(/0*$/, ''));
                switch (result.event) {
                case 'CreateRef':
                    refObject[refname] = hash;
                    transactionsLeft--;
                    break;
                case 'UpdateRef':
                    refObject[refname] = hash;
                    transactionsLeft--;
                    break;
                case 'DeleteRef':
                    delete refObject[refname];
                    transactionsLeft--;
                    break;
                }
                if (transactionsLeft == 0) {
                    resolve(refObject);
                }
            });
        });

        return (() => {
            let pendingCallback;
            let allRefs;

            refs.then(refObject => {
                allRefs = Object.keys(refObject).map(name => ({
                    name,
                    hash: refObject[name]
                }));
                if (pendingCallback) {
                    pendingCallback();
                }
            });

            return (abort, cb) => {
                if (abort) {
                    evt.stopWatching();
                    cb(true);
                } else if (allRefs) {
                    evt.stopWatching();
                    cb(true);
                }
            };
        })();
    }

    refs () {
        return (abort, cb) => {
            cb(true);
        };
    }

    symrefs () {
        let symrefs = [{
            name: 'HEAD',
            ref: 'refs/heads/master'
        }];
        return (abort, cb) => {
            if (abort) {
                cb(true);
            } else if (symrefs.length > 0) {
                cb(null, symrefs.pop());
            } else {
                cb(true, null);
            }
        };
    }
}

module.exports = Repo;
