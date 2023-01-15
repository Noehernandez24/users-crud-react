import axios from "axios";
import React from "react";
import deleteSucess from '../assets/delete-sucess.mp3'

const UsersList = ({ user, getUsers, userSelect, setShowPopUp, setIsDelete}) => {
    let sound = new Audio(deleteSucess)

    const deleteUser = (userSelect) =>{
        axios.delete(`https://users-crud.academlo.tech/users/${userSelect.id}/`)
        .then(() => {
            getUsers()
            setIsDelete(true)
            setShowPopUp(true)
            sound.play()
        })  
    }
    
  return (
    <div className="card">
      <h3 className="card__title">{user.first_name} {user.last_name}</h3>

      <div className="card__info">
      <p className="card__description">CORREO</p>
      <p>{user.email}</p>
      </div>

      <div className="card__info">
      <p className="card__description">CUMPLEAÑOS</p>
      <p className="gift"><i className='bx bx-gift bx-sm'></i> {user.birthday}</p>
      </div>

      <div className="card__btns">
        <button onClick={() => deleteUser(user)} className="delete-btn"><i className='bx bx-trash bx-sm'></i></button>
        <button onClick={() => userSelect(user)} className="edit-btn"><i className='bx bx-pencil bx-sm' ></i></button>
      </div>

    </div>
  );
};

export default UsersList;
