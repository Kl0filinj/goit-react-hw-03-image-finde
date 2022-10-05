import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import LoadMoreBtn from './LoadMoreBtn';
import getImages from './services/api';
import '../styles.css';

export class App extends Component {
  state = {
    serchReqest: '',
    status: 'idle',
    imagesList: [],
    page: 1,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.serchReqest !== this.state.serchReqest) {
      try {
        console.log('from INITIAL');
        this.setState({ status: 'pending' });
        const images = await getImages(this.state.serchReqest, this.state.page);
        this.setState({
          imagesList: images.hits,
          status: 'completed',
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
        console.log('у вас Ошибка => ', error);
      }
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      try {
        console.log('from LOADMORE');
        this.setState({ status: 'pending' });

        const images = await getImages(this.state.serchReqest, this.state.page);
        console.log(images);
        this.setState(prState => ({
          imagesList: [...prState.imagesList, ...images.hits],
          status: 'completed',
        }));
      } catch (error) {
        console.log('у вас Ошибка => ', error);
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  onSubmit = req => {
    this.setState({ serchReqest: req, page: 1, imagesList: [] });
  };

  loadMoreBtnHandler = () => {
    this.setState(prState => ({ page: prState.page + 1 }));
  };

  render() {
    const { status, imagesList, error } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.onSubmit} />
        {status === 'idle' && (
          <h1 className="temporaty-heading">Enter your request ⬆️</h1>
        )}
        {status === 'error' && <h1 className="temporaty-heading">{error}</h1>}

        <ImageGallery
          serchReqest={this.state.serchReqest}
          images={imagesList}
        />

        {status === 'pending' && <Loader />}

        {imagesList.length > 0 && status === 'completed' && (
          <LoadMoreBtn onClickHandler={this.loadMoreBtnHandler} />
        )}
      </div>
    );
  }
}
