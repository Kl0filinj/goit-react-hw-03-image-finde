import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import LoadMoreBtn from './LoadMoreBtn';
import getImages from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  // state = {
  //   serchReqest: '',
  //   status: 'idle',
  //   imagesList: [],
  //   page: 1,
  //   error: null,
  //   totalHits: null,
  // };

  const [serchReqest, setSerchReqest] = useState('');
  const [status, setStatus] = useState('idle');
  const [imagesList, setImagesList] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  // async componentDidUpdate(prevProps, prevState) {
  //   if (prevState.serchReqest !== this.state.serchReqest) {
  //     this.setState({ status: 'pending' });

  //     try {
  //       const images = await getImages(this.state.serchReqest, this.state.page);
  //       if (images.hits.length === 0) {
  //         this.setState({
  //           status: 'empty',
  //         });
  //       } else {
  //         this.setState({
  //           imagesList: images.hits,
  //           status: 'completed',
  //           totalHits: images.totalHits,
  //         });
  //       }
  //     } catch (error) {
  //       this.setState({ error, status: 'rejected' });
  //       console.log('у вас Ошибка => ', error);
  //     }
  //   }
  //   if (prevState.page !== this.state.page && this.state.page !== 1) {
  //     this.setState({ status: 'pending' });

  //     try {
  //       const images = await getImages(this.state.serchReqest, this.state.page);

  //       this.setState(prState => ({
  //         imagesList: [...prState.imagesList, ...images.hits],
  //         status: 'completed',
  //       }));
  //     } catch (error) {
  //       console.log('у вас Ошибка => ', error);
  //       this.setState({ error, status: 'rejected' });
  //     }
  //   }
  // }

  useEffect(() => {}, []);

  const onSubmit = req => {
    if (req === serchReqest) {
      return toast.error('Enter new request ^_^');
    }
    // this.setState({ serchReqest: req, page: 1, imagesList: [] });
    setSerchReqest(req);
    setPage(1);
    setImagesList([]);
  };

  const loadMoreBtnHandler = () => {
    // this.setState(prState => ({ page: prState.page + 1 }));
    setPage(prState => prState + 1);
  };

  if (totalHits === imagesList.length) {
    toast.error('Sorry, there are no more photos :(');
  }
  if (status === 'error') {
    toast.error(`${error}`);
  }

  return (
    <div className="app">
      <Searchbar onSubmit={onSubmit} />
      {status === 'idle' && (
        <h1 className="temporaty-heading">Enter your request ⬆️</h1>
      )}

      {status === 'empty' && (
        <h1 className="temporaty-heading">
          No results by request "{serchReqest}" 😢
        </h1>
      )}

      <ImageGallery images={imagesList} />

      {status === 'pending' && <Loader />}

      {imagesList.length > 0 &&
        totalHits !== imagesList.length &&
        status !== 'pending' && (
          <LoadMoreBtn onClickHandler={loadMoreBtnHandler} />
        )}

      <ToastContainer theme="colored" />
    </div>
  );
};
