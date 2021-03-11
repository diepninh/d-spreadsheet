import React from 'react';
import ReactDOM from 'react-dom';
import ExcelTable from './js/components/ExcelTable/ExcelTable.js';
import { createStore } from 'redux';
import myReducer from './js/reducers/index';
import { Provider } from 'react-redux';
const wrapper = document.getElementById('diepContainer');

const store = createStore(myReducer);


wrapper ? ReactDOM.render(
  <Provider store={store}>
    <div className="container" style={{ position: 'relative' }}>
      <ExcelTable  />
    </div>
  </Provider>
  , wrapper) : false;
