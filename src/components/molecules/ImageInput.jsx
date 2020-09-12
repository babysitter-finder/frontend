import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ImageInput = ({ handleImage, imageValue }) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const image = document.querySelector('.imageInput-preview');
    const input = document.querySelector('.imageInput-inputfile');
    if(imageValue) {
      setSrc(imageValue);
      image.style.display = 'block';
    }
    const reader = new FileReader();
    input.addEventListener('change', function() {
      const file = this.files[0];

      if (file) {
        image.style.display = 'block';

        reader.addEventListener('load', function() {
          image.setAttribute('src', this.result);
          setSrc(this.result);
        });

        reader.readAsDataURL(file);
      } else {
        image.style.display = null;
      }
    });

    return () => {
      input.removeEventListener('change', function () {
        const file = this.files[0];

        if (file) {
          image.style.display = 'block';

          reader.addEventListener('load', function () {
            image.setAttribute('src', this.result);
            setSrc(this.result);
          });

          reader.readAsDataURL(file);
        } else {
          image.style.display = null;
        }
      });
      reader.removeEventListener('load', function () {
        image.setAttribute('src', this.result);
        setSrc(this.result);
      });
    }
  }, [imageValue])

  return (
    <div className="imageInput">
      <input type="file" name="picture" id="picture" className="imageInput-inputfile" accept="image/*" onChange={ handleImage } />
      <label htmlFor="picture" className="imageInput-label">
        Selecciona una foto
        <img src={ src } alt="Image Preview" className="imageInput-preview" />
      </label>
    </div>
  );
};

ImageInput.propTypes = {
  handleImage: PropTypes.func.isRequired,
  imageValue: PropTypes.string,
};

export default ImageInput;