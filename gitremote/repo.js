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
        let refs;
        new Promise((resolve) => {
            let refObject = {};
            this.repoContract.allEvents({ fromBlock: 0, toBlock: 'pending' }, (err, result) => {
                process.stderr.write('event\n');
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
        }).then(refObject => {
            process.stderr.write(JSON.stringify(refObject));
            refs = Object.keys(refObject).map(name => ({
                name,
                hash: refObject[name]
            }));
        });

        return (abort, cb) => {
            process.stderr.write('testing\n');
            if (abort) {
                cb(true);
            } else if (!!refs && refs.length > 0) {
                cb(null, refs.pop());
            } else {
                cb(null, null);
            }
        };
    }

    symrefs () {
        return (abort, cb) => {
            cb(true);
        };
    }
}

module.exports = Repo;
