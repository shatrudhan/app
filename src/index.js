import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// import Stopwatch from './project_1/Stopwatch';
// import Timer from './project_2/Timer';
// import Todo from './project_3/Todo';
// import Fileupload from './project_4/Fileupload';
import Header from './header/Header';

ReactDOM.render(<Header />, document.getElementById('id_header'));
// ReactDOM.render(<Stopwatch />, document.getElementById('project_1'));
// ReactDOM.render(<Timer />, document.getElementById('project_2'));
// ReactDOM.render(<Todo />, document.getElementById('project_3'));
// ReactDOM.render(<Fileupload />, document.getElementById('project_4'));


serviceWorker.unregister();
