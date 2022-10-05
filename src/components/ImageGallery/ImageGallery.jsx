import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';

import './imageGallery.css';

export default class ImageGallery extends Component {
  render() {
    const { images } = this.props;
    return (
      <ul className="imageGallery">
        {images.map(({ webformatURL, id, largeImageURL }) => (
          <ImageGalleryItem
            src={webformatURL}
            key={id}
            largeImage={largeImageURL}
          ></ImageGalleryItem>
        ))}
      </ul>
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
