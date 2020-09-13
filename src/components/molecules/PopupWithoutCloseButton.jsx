import React from 'react';
import ReactDOM from 'react-dom';

const PopupWithoutCloseButton = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup-container">
        { children }
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default PopupWithoutCloseButton;