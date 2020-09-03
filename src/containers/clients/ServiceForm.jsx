import React from 'react';

const ServiceForm = () => {
  const handleInput = () => {

  };
  
  return (
    <div className="serviceForm">
      <h1>Solicitar cita</h1>
      <form onSubmit="">
        <div className="left">
          <div className="input input-alignedLeft">
            <label htmlFor="day">Día:</label>
            <input type="date" name="day" placeholder="Día" onChange={ handleInput } />
          </div>
          <div className="input input-alignedLeft">
            <label htmlFor="service_start">Hora de inicio:</label>
            <input type="time" name="service_start" placeholder="Hora de inicio" onChange={ handleInput } />
          </div>
          <div className="input input-alignedLeft">
            <label htmlFor="service_end">Hora de Finalización:</label>
            <input type="time" name="service_end" placeholder="Hora de inicio" onChange={ handleInput } />
          </div>
          <div className="input input-alignedLeft">
            <label htmlFor="count_children">Numero de niños:</label>
            <input type="number" name="count_children" placeholder="Numero de niños" onChange={ handleInput } />
          </div>
        </div>
        <div className="right">
          <div className="select">
            <label htmlFor="genre">Horario:</label>
            <select name="genre" onChange={ handleInput }>
              <option selected disabled="disabled">Selecciona una opción</option>
              <option value="morning">Mañana</option>
              <option value="noon">Mediodía</option>
              <option value="afternoon">Tarde</option>
              <option value="night">Noche</option>
            </select>
          </div>
        </div>
        <div className="input">
          <label htmlFor="address">Lugar:</label>
          <input type="hidden" name="address" placeholder="Dirección" onChange={ handleInput } />
        </div>
        <button className="button-green" type="submit">Registrar</button>

        {/* <strong>{ error }</strong> */}
      </form>
    </div>
  );
};

export default ServiceForm;