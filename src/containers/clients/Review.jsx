import React, { useState, useEffect } from 'react';
import Caption from '../../components/molecules/Caption';
import StarsRating from '../../components/atoms/StarsRating';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getService } from '../../actions/servicesActions';
import { registerReview } from '../../actions/reviewsActions';
import { useParams } from 'react-router-dom';

const Review = ({ getService, editForm, loading, registerReview }) => {

  const [form, setForm] = useState({});

  const { id } = useParams();
  useEffect(() => {
    editForm
    getService(id);
  }, []);

  const handleChange = (value) => {
    setForm({
      ...form,
      reputation: parseInt(value)
    });
  };
  
  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    registerReview(id, form);
  };

  return (
    <div className="review">
      {!loading && <div className="review-container">
        <Caption name={ editForm?.user_bbs?.fullname } image={ editForm?.user_bbs?.picture } />
        <h2>Califica a la niñera</h2>
        <StarsRating onChange={ handleChange } />
        <div className="textArea">
          <label htmlFor="review">Comentarios</label>
          <textarea name="review" id="review" rows="10" onChange={ handleInput }></textarea>
        </div>
        <button className="button" onClick={ handleSubmit }>Calificar</button>
      </div>}
    </div>
  );
};

Review.propTypes = {
  getService: PropTypes.func,
  registerReview: PropTypes.func,
  editForm: PropTypes.object,
  loading: PropTypes.bool,
}

const mapDispatchToProps = {
  getService,
  registerReview,
};

const mapStateToProps = (reducer) => {
  return {
    ...reducer.servicesReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);