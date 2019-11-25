import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// 样式设置
// ------------输入框--------------------
let inputWid = `${'int'}px`;        // 文本输入框宽
let inputHei = `${'int'}px`;        // 文本输入框高
// ------------评论区卡片-----------------
let comCardWid = `${'int'}px`;      // 评论区卡片宽
let comCardHei = `${'int'}px`;      // 评论区卡片高
// ------------输入框布置位置--------------
let direct = 'up';                  //up,bottom,left,right

ReactDOM.render(<App inputWid={inputWid} inputHei={inputHei} comCardWid={comCardHei} comCardWid={comCardWid} direct={direct}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
