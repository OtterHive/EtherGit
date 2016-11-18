import {
    LOAD_VERSION_CONTROL_CONTRACT, RECEIVE_LOAD_VERSION_CONTROL_CONTRACT,
    GET_VERSION
} from '../actions/versionControl';

let initialState = {
};

export default (state = initialState, action) => {
    switch (action.type) {
    case LOAD_VERSION_CONTROL_CONTRACT:
        return {
            ...state,
            loading: true
        };
    case RECEIVE_LOAD_VERSION_CONTROL_CONTRACT:
        return {
            ...state,
            loading: false,
            contract: action.contract
        };
    case GET_VERSION:
        return {
            ...state,
            version: action.version
        };
    default:
        return state;
    }
};
