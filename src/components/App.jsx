import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import '../styles.css';

export class App extends Component {
  state = {};
  render() {
    return (
      <div className="app">
        <Searchbar />
        <ImageGallery />
      </div>
    );
  }
}
