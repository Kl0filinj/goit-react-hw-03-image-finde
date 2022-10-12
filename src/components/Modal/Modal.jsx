import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './modal.css';

const Modal = ({ closeModal, image }) => {
  // componentDidMount() {
  // window.addEventListener('keydown', this.closeModalHandler);
  // document.body.style.overflow = 'hidden';
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.closeModalHandler);
  //   document.body.style.overflow = 'visible';
  // }
  const closeModalHandler = evt => {
    if (evt.code === 'Escape') {
      closeModal();
    }
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', closeModalHandler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', closeModalHandler);
      document.body.style.overflow = 'visible';
    };
  }, [closeModalHandler]);

  return (
    <div className="overlay" onClick={closeModalHandler}>
      <div className="modal">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
