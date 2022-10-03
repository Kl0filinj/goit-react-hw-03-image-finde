import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import '../styles.css';

export class App extends Component {
  state = {
    serchReqest: '',
  };
  onSubmit = req => {
    this.setState({ serchReqest: req });
  };

  render() {
    return (
      <div className="app">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery serchReqest={this.state.serchReqest} />
      </div>
    );
  }
}
