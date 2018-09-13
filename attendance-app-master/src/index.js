// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

// Reducer
import reducer from './reducer';

// Components
import App from './components/App';
import Home from './components/Home';
import RecentEntries from './components/RecentEntries';
import Data from './components/Data';
import Students from './components/Students';
import StudentDetails from './components/StudentDetails';
import RollCall from './components/RollCall';

import './index.css';
import './react-vis.css';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ),
);

const route = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRedirect to='home' />
        <Route path='home' component={Home} />
        <Route path='recent' component={RecentEntries} />
        <Route path='data' component={Data} />
        <Route path='rollcall' component={RollCall}/>
        <Route path='students' component={Students}></Route>
        <Route path=':id' component={StudentDetails}/>
      </Route>
    </Router>
  </Provider>
)
ReactDOM.render(
  route,
  document.getElementById('root')
);
