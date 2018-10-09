import React from 'react';
import 'whatwg-fetch';
import ReactDOM from 'react-dom';
import Slideshow from 'slideshow.jsx';

let component;

function fetchPhotos() {
  fetch('/images')
  .then(response => response.json())
  .then(updateProps);
}

function updateProps(props) {
  const contentAnchor = document.getElementById('root');
  component = ReactDOM.render(<Slideshow {...component.props} {...props} />, contentAnchor);
}

window.onload = function onLoad() {
  const contentAnchor = document.getElementById('root');
  component = ReactDOM.render(<Slideshow />, contentAnchor);
  setInterval(fetchPhotos, 3000);
};

