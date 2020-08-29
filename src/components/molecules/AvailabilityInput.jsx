import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const AvailabilityInput = ({ mini }) => {
  const availabilityClass = classNames(
    {
      'availabilityInput': !mini,
      'availabilityInput-mini': mini,
    }
  );
  return (
    <table className={ availabilityClass }>
      <thead>
        <tr>
          <th></th>
          <th>{ !mini ? 'Lúnes' : 'Lu' }</th>
          <th>{ !mini ? 'Martes' : 'Ma' }</th>
          <th>{ !mini ? 'Miercoles' : 'Mi'}</th>
          <th>{ !mini ? 'Jueves' : 'Ju' }</th>
          <th>{ !mini ? 'Viernes' : 'Vi' }</th>
          <th>{ !mini ? 'Sábado' : 'Sa' }</th>
          <th>{ !mini ? 'Domingo' : 'Do' }</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mañana</td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
        </tr>
        <tr>
          <td>Mediodía</td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
        </tr>
        <tr>
          <td>Tarde</td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
        </tr>
        <tr>
          <td>Noche</td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
        </tr>
      </tbody>
    </table>
  );
};

AvailabilityInput.propTypes = {
  mini: PropTypes.bool
}

export default AvailabilityInput;