import React from 'react';
import ImageInput from '../../components/molecules/ImageInput';
import TextAreaCustom from '../../components/molecules/TextAreaCustom'
import AvailabilityInput from '../../components/molecules/AvailabilityInput'

const Register = () => {

  return(
    <div className="register">
      <div className="register-container">
        <div className="personalInfoForm">
          <div className="personalInfoForm-container">
            <h2>Registro de niñeras</h2>
            <form onSubmit="">
              <div className="left">
                <div className="input input-alignedLeft">
                  <label htmlFor="first_name">Nombres:</label>
                  <input type="text" name="first_name" placeholder="Nombres" onChange=""></input>
                </div>
                <div className="input input-alignedLeft">
                  <label htmlFor="last_name">Apellidos:</label>
                  <input type="text" name="last_name" placeholder="Apellidos" onChange=""></input>
                </div>
                <div className="input input-alignedLeft">
                  <label htmlFor="email">Correo:</label>
                  <input type="email" name="email" placeholder="Correo" onChange=""></input>
                </div>
                <div className="input input-alignedLeft">
                  <label htmlFor="password">Contraseña:</label>
                  <input type="password" name="password" placeholder="Contraseña" onChange=""></input>
                </div>
                <div className="input input-alignedLeft">
                  <label htmlFor="password_confirmation">Confirmar Contraseña:</label>
                  <input type="password" name="password_confirmation" placeholder="Contraseña" onChange=""></input>
                </div>
                <div className="input input-alignedLeft">
                  <label htmlFor="username">Nombre de usuario:</label>
                  <input type="text" name="username" placeholder="Nombre de usuario" onChange=""></input>
                </div>
                <div className="input input-alignedLeft">
                  <label htmlFor="birthdate">Fecha de Nacimiento:</label>
                  <input type="date" name="birthdate" placeholder="Fecha de Nacimiento" onChange=""></input>
                </div>
              </div>
              <div className="right">
                <ImageInput handleImage=""/>
                <div className="input">
                  <label htmlFor="phone_number">Celular:</label>
                  <input type="number" name="phone_number" placeholder="Celular" onChange=""></input>                    
                </div>
                <div className="select">
                  <label htmlFor="genre">Género:</label>
                  <select name="genre" onChange="">
                    <option>Selecciona una opción</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                  </select>
                </div>
              </div>
              <div className="input">
                <label htmlFor="address">Dirección:</label>
                <input type="text" name="address" placeholder="Dirección" onChange="" />
              </div>
              <div className="profile-data">
                <TextAreaCustom text="education_degree" label="Estudios" />
              </div>
              <div className="profile-data">
                <TextAreaCustom text="about_me" label="Acerca de mi" />
              </div>
              <div className="availability-container">
                <h4>Disponibilidad horaria</h4>
                <table className="availabilityInput">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Lúnes</th>
                      <th>Martes</th>
                      <th>Miercoles</th>
                      <th>Jueves</th>
                      <th>Viernes</th>
                      <th>Sábado</th>
                      <th>Domingo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr id="morning">
                      <td>Mañana</td>
                      <td><input name="monday-morning"  type="checkbox" /></td>
                      <td><input name="thusday-morning"  type="checkbox" /></td>
                      <td><input name="wednesday-morning"  type="checkbox" /></td>
                      <td><input name="thursday-morning"  type="checkbox" /></td>
                      <td><input name="friday-morning"  type="checkbox" /></td>
                      <td><input name="saturday-morning"  type="checkbox" /></td>
                      <td><input name="sunday-morning"  type="checkbox" /></td>
                    </tr>
                    <tr id="afternoon">
                      <td>Mediodía</td>
                      <td><input name="monday-afternoon"  type="checkbox" /></td>
                      <td><input name="thusday-afternoon"  type="checkbox" /></td>
                      <td><input name="wednesday-afternoon"  type="checkbox" /></td>
                      <td><input name="thursday-afternoon"  type="checkbox" /></td>
                      <td><input name="friday-afternoon"  type="checkbox" /></td>
                      <td><input name="saturday-afternoon"  type="checkbox" /></td>
                      <td><input name="sunday-afternoon"  type="checkbox" /></td>
                    </tr>
                    <tr id="evening">
                      <td>Tarde</td>
                      <td><input name="monday-evening"  type="checkbox" /></td>
                      <td><input name="thusday-evening"  type="checkbox" /></td>
                      <td><input name="wednesday-evening"  type="checkbox" /></td>
                      <td><input name="thursday-evening"  type="checkbox" /></td>
                      <td><input name="friday-evening"  type="checkbox" /></td>
                      <td><input name="saturday-evening"  type="checkbox" /></td>
                      <td><input name="sunday-evening"  type="checkbox" /></td>
                    </tr>
                    <tr id="night">
                      <td>Noche</td>
                      <td><input name="monday-night"  type="checkbox" /></td>
                      <td><input name="thusday-night"  type="checkbox" /></td>
                      <td><input name="wednesday-night"  type="checkbox" /></td>
                      <td><input name="thursday-night"  type="checkbox" /></td>
                      <td><input name="friday-night"  type="checkbox" /></td>
                      <td><input name="saturday-night"  type="checkbox" /></td>
                      <td><input name="sunday-night"  type="checkbox" /></td>
                    </tr>
                  </tbody>
                </table>
                <button className="button-blue" type="submit">Registrar</button>
              </div>
            </form>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Register;