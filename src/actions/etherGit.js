import web3 from '../web3';
import EtherGitABI from '../../contracts/EtherGit.json';

export const LOAD_ETHER_GIT_CONTRACT = 'LOAD_ETHER_GIT_CONTRACT';
export const RECEIVE_LOAD_ETHER_GIT_CONTRACT = 'RECEIVE_LOAD_ETHER_GIT_CONTRACT';

export const loadEtherGitContract = () => {
    return (dispatch, getState) => {
        dispatch({
            type: LOAD_ETHER_GIT_CONTRACT
        });
        web3.eth.contract(EtherGitABI).at(getState().versionControl.version, (err, contract) => {
            dispatch({
                type: RECEIVE_LOAD_ETHER_GIT_CONTRACT,
                contract
            });
        });
    };
};
