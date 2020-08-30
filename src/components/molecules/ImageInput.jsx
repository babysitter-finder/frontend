import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageInput = ({ handleImage }) => {

  useEffect(() => {
    const image = document.querySelector('.imageInput-preview');
    const input = document.querySelector('.imageInput-inputfile');
    const reader = new FileReader();
    input.addEventListener('change', function() {
      const file = this.files[0];

      if (file) {
        image.style.display = 'block';

        reader.addEventListener('load', function() {
          image.setAttribute('src', this.result);
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
          });

          reader.readAsDataURL(file);
        } else {
          image.style.display = null;
        }
      });
      reader.removeEventListener('load', function () {
        image.setAttribute('src', this.result);
      });
    }
  }, [])

  return (
    <div className="imageInput">
      <input type="file" name="file" id="file" className="imageInput-inputfile" accept="image/*" onChange={ handleImage } />
      <label htmlFor="file" className="imageInput-label">
        Selecciona una foto
        <img src="" alt="Image Preview" className="imageInput-preview" />
      </label>
    </div>
  );
};

ImageInput.propTypes = {
  handleImage: PropTypes.func.isRequired,
};

export default ImageInput;