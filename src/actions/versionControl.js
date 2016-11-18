import web3 from '../web3';
import VersionControlABI from '../../contracts/VersionControl.json';

export const LOAD_VERSION_CONTROL_CONTRACT = 'LOAD_VERSION_CONTROL_CONTRACT';
export const RECEIVE_LOAD_VERSION_CONTROL_CONTRACT = 'RECEIVE_LOAD_VERSION_CONTROL_CONTRACT';

export const loadVersionControlContract = () => {
    return dispatch => {
        dispatch({
            type: LOAD_VERSION_CONTROL_CONTRACT
        });
        console.log('getting');
        web3.eth.contract(VersionControlABI).at('0x0d11b966d15906b873c4a8c2cd5b4380fca5de8b', (err, contract) => {
            console.log('got');
            dispatch({
                type: RECEIVE_LOAD_VERSION_CONTROL_CONTRACT,
                contract
            });
            dispatch(getVersion());
        });
    };
};

export const GET_VERSION = 'GET_VERSION';

export const getVersion = () => {
    return (dispatch, getState) => {
        console.log('getting');
        getState().versionControl.contract.getVersion.call((err, version) => {
            console.log('got');
            dispatch({
                type: GET_VERSION,
                version
            });
        });
    };
};
