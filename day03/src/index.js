import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
// import App from './重复渲染/App';
// import App from './key/App';
// import App from './setState/App';
import TodoItem from './shouldComponentUpdate/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TodoItem />);
