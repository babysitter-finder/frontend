import React from 'react';
import ReactDOM from 'react-dom';

const Popup = ({ children, closePopup }) => {
  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup-container">
        <button className="popup-close" onClick={ closePopup }>X</button>
        { children }
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Popup;