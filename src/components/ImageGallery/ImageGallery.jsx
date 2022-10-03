import React, { Component } from 'react';
import getImages from '../services/api';
import ImageGalleryItem from '../ImageGalleryItem';
import LoadMoreBtn from '../LoadMoreBtn';
import { MagnifyingGlass } from 'react-loader-spinner';
import './imageGallery.css';

export default class ImageGallery extends Component {
  state = {
    status: 'idle',
    imagesList: [],
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.serchReqest !== this.props.serchReqest) {
      this.setState({ status: 'pending' });
      getImages(this.props.serchReqest)
        .then(images =>
          this.setState({ imagesList: images.hits, status: 'completed' })
        )
        .catch(error => {
          console.log(error);
          this.setState({ error, status: 'rejected' });
        });
    }
  }
  render() {
    const { status, imagesList, error } = this.state;
    if (status === 'idle') {
      return <h1 className="temporaty-heading">Enter your request ⬆️</h1>;
    }
    if (status === 'pending') {
      return (
        <div className="loaderPlaceholder">
          <MagnifyingGlass
            visible={true}
            height="150"
            width="150"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        </div>
      );
    }
    if (status === 'completed') {
      return (
        <>
          <ul className="imageGallery">
            {imagesList.map(({ webformatURL, id }) => (
              <ImageGalleryItem src={webformatURL} key={id} />
            ))}
          </ul>
          {imagesList.length > 0 && <LoadMoreBtn />}
        </>
      );
    }
    if (status === 'error') {
      return <h1 className="temporaty-heading">{error}</h1>;
    }
  }
}
