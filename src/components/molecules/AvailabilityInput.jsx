import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const AvailabilityInput = ({ mini, availabilities }) => {
  const availabilityClass = classNames(
    {
      'availabilityInput': !mini,
      'availabilityInput-mini': mini,
    }
  );
  useEffect(() => {
    availabilities.forEach(availability => {
      const $checkbox = document.querySelector(`input[name='${availability.day.toLowerCase()}-${availability.shift}']`);
      if ($checkbox) {
        $checkbox.checked = true;
      }
    });
  }, [availabilities]);
  return (
    <table className={ availabilityClass }>
      <thead>
        <tr>
          <th></th>
          <th>{ !mini ? 'Lúnes' : 'Lu' }</th>
          <th>{ !mini ? 'Martes' : 'Ma' }</th>
          {/* Miercoles => Miércoles  */}
          <th>{ !mini ? 'Miercoles' : 'Mi'}</th>
          <th>{ !mini ? 'Jueves' : 'Ju' }</th>
          <th>{ !mini ? 'Viernes' : 'Vi' }</th>
          <th>{ !mini ? 'Sábado' : 'Sa' }</th>
          <th>{ !mini ? 'Domingo' : 'Do' }</th>
        </tr>
      </thead>
      <tbody>
        <tr id="morning">
          <td>Mañana</td>
          <td><input name="monday-morning" disabled type="checkbox" /></td>
          {/* thusday => tuesday */}
          <td><input name="thusday-morning" disabled type="checkbox" /></td>
          <td><input name="wednesday-morning" disabled type="checkbox" /></td>
          <td><input name="thursday-morning" disabled type="checkbox" /></td>
          <td><input name="friday-morning" disabled type="checkbox" /></td>
          <td><input name="saturday-morning" disabled type="checkbox" /></td>
          <td><input name="sunday-morning" disabled type="checkbox" /></td>
        </tr>
        <tr id="afternoon">
          <td>Mediodía</td>
          <td><input name="monday-afternoon" disabled type="checkbox" /></td>
          {/* thusday => tuesday */}
          <td><input name="thusday-afternoon" disabled type="checkbox" /></td>
          <td><input name="wednesday-afternoon" disabled type="checkbox" /></td>
          <td><input name="thursday-afternoon" disabled type="checkbox" /></td>
          <td><input name="friday-afternoon" disabled type="checkbox" /></td>
          <td><input name="saturday-afternoon" disabled type="checkbox" /></td>
          <td><input name="sunday-afternoon" disabled type="checkbox" /></td>
        </tr>
        <tr id="evening">
          <td>Tarde</td>
          <td><input name="monday-evening" disabled type="checkbox" /></td>
          {/* thusday => tuesday */}
          <td><input name="thusday-evening" disabled type="checkbox" /></td>
          <td><input name="wednesday-evening" disabled type="checkbox" /></td>
          <td><input name="thursday-evening" disabled type="checkbox" /></td>
          <td><input name="friday-evening" disabled type="checkbox" /></td>
          <td><input name="saturday-evening" disabled type="checkbox" /></td>
          <td><input name="sunday-evening" disabled type="checkbox" /></td>
        </tr>
        <tr id="night">
          <td>Noche</td>
          <td><input name="monday-night" disabled type="checkbox" /></td>
          {/* thusday => tuesday */}
          <td><input name="thusday-night" disabled type="checkbox" /></td>
          <td><input name="wednesday-night" disabled type="checkbox" /></td>
          <td><input name="thursday-night" disabled type="checkbox" /></td>
          <td><input name="friday-night" disabled type="checkbox" /></td>
          <td><input name="saturday-night" disabled type="checkbox" /></td>
          <td><input name="sunday-night" disabled type="checkbox" /></td>
        </tr>
      </tbody>
    </table>
  );
};

AvailabilityInput.propTypes = {
  mini: PropTypes.bool,
  availabilities: PropTypes.array
}

export default AvailabilityInput;