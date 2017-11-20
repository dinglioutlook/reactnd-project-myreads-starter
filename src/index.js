import React from 'react'
import ReactDOM from 'react-dom'
import BooksApp from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<BrowserRouter><BooksApp /></BrowserRouter>,
 document.getElementById('root'));

 registerServiceWorker();