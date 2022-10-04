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
    page: 1,
    modal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.serchReqest !== this.props.serchReqest) {
      this.setState({ status: 'pending', page: 1, imagesList: [] });
      getImages(this.props.serchReqest, this.state.page)
        .then(images => {
          console.log('From Initial fetch', prevState.imagesList);
          return this.setState({
            imagesList: images.hits,
            status: 'completed',
          });
        })
        .catch(error => {
          console.log('у вас Ошибка => ', error);
          this.setState({ error, status: 'rejected' });
        });
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ status: 'pending' });

      getImages(this.props.serchReqest, this.state.page)
        .then(images => {
          console.log(prevState.imagesList);
          console.log(images.hits);
          return this.setState(prState => ({
            imagesList: [...prState.imagesList, ...images.hits],
            status: 'completed',
          }));
        })
        .catch(error => {
          console.log('у вас Ошибка => ', error);
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  loadMoreBtnHandler = () => {
    this.setState(prState => ({ page: prState.page + 1 }));
  };

  toggleModalHandler = () => {
    this.setState({ modal: !this.state.modal });
  };
  render() {
    const { status, imagesList, error } = this.state;
    return (
      <>
        {status === 'idle' && (
          <h1 className="temporaty-heading">Enter your request ⬆️</h1>
        )}

        {status === 'error' && <h1 className="temporaty-heading">{error}</h1>}
        {/* {status === 'completed' && ( */}

        <ul className="imageGallery">
          {imagesList.map(({ webformatURL, id }) => (
            <ImageGalleryItem
              src={webformatURL}
              key={id}
              toggleModalHandler={this.toggleModalHandler}
            ></ImageGalleryItem>
          ))}
        </ul>

        {status === 'pending' && (
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
        )}
        {imagesList.length > 0 && status === 'completed' && (
          <LoadMoreBtn onClickHandler={this.loadMoreBtnHandler} />
        )}

        {/* )} */}
      </>
    );
  }
}

// if (status === 'idle') {
//   return <h1 className="temporaty-heading">Enter your request ⬆️</h1>;
// }
// if (status === 'pending') {
//   return (
//     <div className="loaderPlaceholder">
//       <MagnifyingGlass
//         visible={true}
//         height="150"
//         width="150"
//         ariaLabel="MagnifyingGlass-loading"
//         wrapperStyle={{}}
//         wrapperClass="MagnifyingGlass-wrapper"
//         glassColor="#c0efff"
//         color="#e15b64"
//       />
//     </div>
//   );
// }
//   if (status === 'completed') {
//     return (
//       <>
//         <ul className="imageGallery">
//           {imagesList.map(({ webformatURL, id }) => (
//             <ImageGalleryItem src={webformatURL} key={id} />
//           ))}
//         </ul>
//         {status === 'pending' && (
//           <div className="loaderPlaceholder">
//             <MagnifyingGlass
//               visible={true}
//               height="150"
//               width="150"
//               ariaLabel="MagnifyingGlass-loading"
//               wrapperStyle={{}}
//               wrapperClass="MagnifyingGlass-wrapper"
//               glassColor="#c0efff"
//               color="#e15b64"
//             />
//           </div>
//         )}
//         {imagesList.length > 0 && status === 'completed' && (
//           <LoadMoreBtn onClickHandler={this.loadMoreBtnHandler} />
//         )}
//       </>
//     );
//   }
//   if (status === 'error') {
//     return <h1 className="temporaty-heading">{error}</h1>;
//   }
// }
// }
