import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import LoadMoreBtn from './LoadMoreBtn';
import getImages from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
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
  const fetchData = async () => {
    return await getImages(serchReqest, page);
  };

  useEffect(() => {
    if (status === 'idle') {
      return;
    }

    fetchData()
      .then(images => {
        if (images.hits.length === 0) {
          setStatus('empty');
        } else {
          setImagesList(images.hits);
          setStatus('completed');
          setTotalHits(images.totalHits);
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
        console.log('у вас Ошибка => ', error);
      });
  }, [serchReqest]);

  useEffect(() => {
    if (status === 'idle') {
      return;
    }

    if (page !== 1) {
      fetchData()
        .then(images => {
          setImagesList(prevImages => [...prevImages, ...images.hits]);
          setStatus('completed');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
          console.log('у вас Ошибка => ', error);
        });
    }
  }, [page]);

  const onSubmit = req => {
    if (req === serchReqest) {
      return toast.error('Enter new request ^_^');
    }
    setSerchReqest(req);
    setPage(1);
    setImagesList([]);
    setStatus('pending');
  };

  const loadMoreBtnHandler = () => {
    setPage(prState => prState + 1);
    setStatus('pending');
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
      {status === 'error' && (
        <h1 className="temporaty-heading">
          Reload the page ^_^ Error: {error}
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
