//
// Needs web3.js from https://github.com/axic/web3.js/tree/swarm
//

var Web3 = require('web3');
var url = require('url');

var web3 = new Web3(new Web3.providers.HttpProvider('http://geth:8545'));
try {
    web3.eth.defaultAccount = web3.eth.coinbase;
} catch (e) {
}

var swarmPut = function (buf, enc, cb) {
    web3.bzz.put(buf, enc, function (err, ret) {
        if (err) {
            return cb(err);
        }
        cb(null, ret);
    });
};

var swarmGet = function (key, cb) {
    web3.bzz.get('bzz://' + key, function (err, ret) {
        if (err) {
            return cb(err)
        }
        cb(null, ret.content)
    })
}

for (var i = 0; i < 1000; i++) {
    console.log(web3.eth.coinbase);
}

// swarmPut('Hello World', 'application/text', function (err, ret) {
//     if (err) {
//         console.log('Swarm put failed: ', err)
//         return
//     }
//     console.log('Added to swarm: ', ret)
//
//     swarmGet(ret, function (err, ret) {
//         if (err) {
//             console.log('Swarm get failed: ', err)
//             return
//         }
//         console.log('Retrieved from swarm: ', ret)
//     })
// });
