import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
// import { Provider } from 'react-redux'
// import createStore from './redux'
// import './test/redux'

import MRoute from './routes/index'
import * as serviceWorker from './serviceWorker';


// const store = createStore()

ReactDOM.render(<MRoute />, document.getElementById('root'));
// ReactDOM.render(<Provider store={store}><MRoute /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
