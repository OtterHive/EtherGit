import React, { Component } from 'react';
import { render } from 'react-dom';
import web3 from './web3';

let versioncontrolContract = web3.eth.contract([{'constant':true,'inputs':[],'name':'creator','outputs':[{'name':'','type':'address'}],'payable':false,'type':'function'},{'constant':false,'inputs':[],'name':'getVersion','outputs':[{'name':'','type':'address'}],'payable':false,'type':'function'},{'constant':false,'inputs':[{'name':'_personal','type':'address'}],'name':'setPersonal','outputs':[],'payable':false,'type':'function'},{'constant':false,'inputs':[{'name':'_fallback','type':'address'}],'name':'setFallback','outputs':[],'payable':false,'type':'function'},{'constant':true,'inputs':[],'name':'fallback','outputs':[{'name':'','type':'address'}],'payable':false,'type':'function'},{'inputs':[],'type':'constructor'}]);
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
            <button
                onClick={evt => {
                    evt.preventDefault();
                    this.getVersion();
                }}>
                Test
            </button>
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

render(
    <VersionControl/>,
    document.getElementById('anchor')
);
