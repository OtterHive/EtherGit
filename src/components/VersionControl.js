import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadVersionControlContract, getVersion } from '../actions/versionControl';
import { loadEtherGitContract } from '../actions/etherGit';

class VersionControl extends Component {
    constructor (props) {
        super(props);
        this.state = {
            version: ''
        };
    }

    componentWillMount () {
        this.props.loadContract();
    }

    render () {
        let { getVersion, version } = this.props;
        return <div>
            <div>{version}</div>
            <button
                onClick={evt => {
                    evt.preventDefault();
                    getVersion();
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
                }}>
                Set
            </button>
        </div>;
    }
}

VersionControl.propTypes = {
    loadContract: PropTypes.func,
    getVersion: PropTypes.func,
    version: PropTypes.string
};

const Container = connect(
    state => ({
        version: state.versionControl.version
    }),
    dispatch => ({
        loadContract () {
            dispatch(loadVersionControlContract(() => {
                dispatch(getVersion(() => {
                    dispatch(loadEtherGitContract());
                }));
            }));
        },
        getVersion () {
            dispatch(getVersion());
        }
    })
)(VersionControl);

export default Container;
