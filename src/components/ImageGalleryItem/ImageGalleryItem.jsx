import './imageGalleryItem.css';

const ImageGalleryItem = ({ src, toggleModalHandler }) => {
  return (
    <>
      <li className="imageGalleryItem" onClick={toggleModalHandler}>
        <img src={src} alt="" className="imageGalleryItem-image " />
      </li>
    </>
  );
};

export default ImageGalleryItem;
