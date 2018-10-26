import React from 'react';
import 'whatwg-fetch';
import ReactDOM from 'react-dom';
import App from 'app.jsx';

let component;

function fetchPhotos() {
  fetch('/images')
  .then(response => response.json())
  .then(updateProps);
}

function updateProps(props) {
  const contentAnchor = document.getElementById('root');
  component = ReactDOM.render(<App {...component.props} {...props} />, contentAnchor);
}

window.onload = function onLoad() {
  const contentAnchor = document.getElementById('root');
  component = ReactDOM.render(<App />, contentAnchor);
  setInterval(fetchPhotos, 3000);
};

