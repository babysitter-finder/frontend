import React, { useEffect } from 'react';
import Caption from '../../components/molecules/Caption';
import MapWithDirection from '../../components/molecules/MapWithDirection';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getService } from '../../actions/servicesActions';

const ServiceWay = ({ getService, editForm, loading }) => {

  const { id } = useParams();
  useEffect(() => {
    if (!editForm.shift) {
      getService(id);
    }
  }, []);
  return (
    <div className="serviceWay">
      <div className="serviceWay-container">
        <Caption name={ editForm?.user_client?.fullname } image={ editForm?.user_client?.picture } />
        <h3>Puedes contactar a este numero:</h3>
        <h3>{ editForm?.user_client?.phone_number ?? '4492688232'}</h3>
        {!loading && <MapWithDirection origin={ { lat: parseFloat(editForm?.lat), lng: parseFloat(editForm?.long) } } destination={ { lat: parseFloat(editForm?.user_bbs?.lat), lng: parseFloat(editForm?.user_bbs?.long) } } />}
        <button className="button-blue">He llegado</button>
      </div>
    </div>
  );
};

ServiceWay.propTypes = {
  getService: PropTypes.func,
  editForm: PropTypes.object,
  loading: PropTypes.bool,
}

const mapDispatchToProps = {
  getService,
};

const mapStateToProps = (reducer) => {
  return reducer.servicesReducer;
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceWay);