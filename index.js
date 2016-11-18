import React, { Component } from 'react';
import { render } from 'react-dom';
import Web3 from 'web3';

if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}
web3.eth.defaultAccount = web3.eth.coinbase;

let versioncontrolContract = window.web3.eth.contract([{'constant':true,'inputs':[],'name':'creator','outputs':[{'name':'','type':'address'}],'payable':false,'type':'function'},{'constant':false,'inputs':[],'name':'getVersion','outputs':[{'name':'','type':'address'}],'payable':false,'type':'function'},{'constant':false,'inputs':[{'name':'_personal','type':'address'}],'name':'setPersonal','outputs':[],'payable':false,'type':'function'},{'constant':false,'inputs':[{'name':'_fallback','type':'address'}],'name':'setFallback','outputs':[],'payable':false,'type':'function'},{'constant':true,'inputs':[],'name':'fallback','outputs':[{'name':'','type':'address'}],'payable':false,'type':'function'},{'inputs':[],'type':'constructor'}]);
let versioncontrol = new Promise((resolve, reject) => {
    versioncontrolContract.at('0x0d11b966d15906b873c4a8c2cd5b4380fca5de8b', (err, contract) => {
        if (err) {
            reject(err);
        } else {
            resolve(contract);
        }
    });
});

class VersionControl extends Component {
    constructor (props) {
        super(props);
        this.state = {
            version: ''
        };
    }

    componentWillMount () {
        this.getVersion();
    }

    getVersion () {
        versioncontrol.then(contract => {
            contract.getVersion.call((err, version) => {
                if (!err) {
                    this.setState({ version });
                } else {
                    console.log(err);
                }
            });
        });
    }

    render () {
        return <div>
            <input value={this.state.version}
                onChange={evt => {
                    evt.preventDefault();
                    this.setState({
                        version: evt.target.value
                    });
                }}
                />
            <button
                onClick={evt => {
                    evt.preventDefault();
                    versioncontrol.then(contract => {
                        contract.setPersonal(this.state.version, err => {
                            if (!err) {
                                this.getVersion();
                            }
                        });
                    });
                }}>
                Set
            </button>
        </div>;
    }
}

class App extends Component {
    render () {
        return <div>
            <button
                onClick={evt => {
                    evt.preventDefault();
                    console.log(web3);
                }}>
                Test
            </button>
            <VersionControl/>
        </div>;
    }
}

render(
    <App/>,
    document.getElementById('anchor')
);
