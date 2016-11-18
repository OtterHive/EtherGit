import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import VersionControl from './components/VersionControl';
import versionControl from './reducers/versionControl';

const store = createStore(
    combineReducers({
        versionControl
    }),
    applyMiddleware(thunk)
);

render(
    <Provider store={store}>
        <VersionControl/>
    </Provider>,
    document.getElementById('anchor')
);
