import './imageGalleryItem.css';

const ImageGalleryItem = ({ src }) => {
  return (
    <li className="imageGalleryItem">
      <img src={src} alt="" className="imageGalleryItem-image " />
    </li>
  );
};

export default ImageGalleryItem;
