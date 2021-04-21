import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import swDev from './swDev';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

swDev();

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register('/sw.js').then(function(registration) {
//       // Registration was successful
//       console.log('Service Worker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//         console.log('Service Worker registration failed: ', err);
//     });
//   });
// };