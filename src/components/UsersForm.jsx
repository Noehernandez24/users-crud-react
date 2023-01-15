import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import sucefully from '../assets/sucefully.mp3'

const UsersForm = ({changeVisibility, getUsers, setShowForm, userSelected, setUserSelected, setShowPopUp}) => {
    const {handleSubmit, register, reset} = useForm()
    const usersDefault = {birthday: "", email:"",firts_name:"", last_name:"", password:""}
    let sound = new Audio(sucefully)

    

    const submit = (data) =>{
        if (userSelected) {
            axios.put(`https://users-crud.academlo.tech/users/${userSelected.id}/`, data)
            .then(() => {
                getUsers()
                setUserSelected(null)
                setShowForm(false)
                setShowPopUp(true)
                sound.play()
            })
            
        } else{
            axios.post(`https://users-crud.academlo.tech/users/`, data)
            .then(() => {
                getUsers()
                reset(usersDefault)
                setShowForm(false)
                setShowPopUp(true)
                sound.play()
            })
        }
    }

    const update = () =>{
        if (userSelected) {
            reset(userSelected)
        }
    }

    



    update()

   


    return (
        <div className="form-container">

        <form onSubmit={handleSubmit(submit)} className='form-users'>
            <div className="form-main">
            <h2>{userSelected ? "Editar Usuario": "Nuevo Usuario"}</h2>
            <span onClick={changeVisibility} className='exit-form'>X</span>  
            </div>

            <div className="input-container">
                <label htmlFor="name">Nombre</label>
                <input required {...register("first_name")} placeholder='Ej: Noé' type="text" id="name"/>
            </div>

            <div className="input-container">
                <label htmlFor="last-name">Apellidos</label>
                <input required {...register("last_name")} placeholder='Ej: Hernández Cabrera' type="text" id="last-name" />
            </div>

            <div className="input-container">
                <label htmlFor="email">Correo</label>
                <input required {...register("email")} placeholder='Ej: noe@academlo.com' type="email" id="email" />
            </div>

            <div className="input-container">
                <label htmlFor="pass">Contraseña</label>
                <input required {...register("password")} placeholder='Contraseña' type="password" id="pass" />
            </div>

            <div className="input-container">
                <label htmlFor="date">Cumpleaños</label>
                <input required {...register("birthday")} placeholder='DD/MM/AAAA' type="date" id="date" />
            </div>

            <button className='btn-form'>{userSelected ? "Guardar Cambios" : "Agregar nuevo usuario"}</button>

            
        </form>
        </div>
    );
};

export default UsersForm;