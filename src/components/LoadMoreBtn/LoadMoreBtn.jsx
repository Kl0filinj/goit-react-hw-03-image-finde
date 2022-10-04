import React, { Component } from 'react';
import './loadMoreBtn.css';

export default class LoadMoreBtn extends Component {
  render() {
    return (
      <button
        type="button"
        className="loadButton"
        onClick={this.props.onClickHandler}
      >
        Load More
      </button>
    );
  }
}
