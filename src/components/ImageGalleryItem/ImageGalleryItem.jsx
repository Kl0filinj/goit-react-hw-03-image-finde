import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import './imageGalleryItem.css';

export default class ImageGalleryItem extends Component {
  state = {
    modal: false,
  };
  toggleModalHandler = () => {
    this.setState({ modal: !this.state.modal });
  };
  render() {
    const { src, largeImage } = this.props;
    return (
      <>
        <li className="imageGalleryItem" onClick={this.toggleModalHandler}>
          <img src={src} alt="" className="imageGalleryItem-image" />
        </li>
        {this.state.modal && (
          <Modal image={largeImage} closeModal={this.toggleModalHandler} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
