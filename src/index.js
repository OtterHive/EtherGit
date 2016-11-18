import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import VersionControl from './components/VersionControl';
import versionControl from './reducers/versionControl';

import './css/main.scss';

const store = createStore(
    combineReducers({
        versionControl
    }),
    applyMiddleware(thunk)
);

render(
    <Provider store={store}>
        <div>
            <img className="banner" src="/src/images/banner.png"/>
            <VersionControl/>
        </div>
    </Provider>,
    document.getElementById('anchor')
);
