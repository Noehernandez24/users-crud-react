import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'
import axios from 'axios'



function App() {
  // Estados
  const [showForm, setShowForm] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)
  const [usersList, setUserList] = useState([]);
  const [userSelected, setUserSelected] = useState(null)
  const [isDelete, setIsDelete] = useState(false)

  useEffect(() => {
    getUsers()
  },[])

  // console.log(usersList);

  const getUsers = () =>{
    axios.get(`https://users-crud.academlo.tech/users/`)
    .then(res => setUserList(res.data))
  }

  //Cambiar visibilidad del formulario al darle a "X"
  const changeVisibility = () =>{
    setShowForm(false)
    setUserSelected(null)
  }

  const userSelect = (user) =>{
    setUserSelected(user)
    setShowForm(true)
  }

  //Pop-Up close

  const closePopUp = () =>{
    setShowPopUp(false)
    setIsDelete(false)
  }

  //sort
  usersList.sort((a, b) => a.first_name?.localeCompare(b.first_name))


 



  return (
    <div className="App">
      <main className="main">
        <h1>Usuarios</h1>
        <button onClick={() => setShowForm(true)} className='user-btn'>+ Crear nuevo usuario</button>
      </main>


      
      {
        showForm &&
        <UsersForm changeVisibility={changeVisibility} getUsers={getUsers} setShowForm={setShowForm} userSelected={userSelected} setUserSelected={setUserSelected} setShowPopUp={setShowPopUp}/>
      }

      <div className="card-container">
      {
        usersList.map(user => (
          <UsersList getUsers={getUsers} key={user.id} user={user} userSelect={userSelect} setShowPopUp={setShowPopUp} setIsDelete={setIsDelete}/>
        ))
      }
      </div>

      {
        showPopUp &&
      <div className="pop-up-container">

        <div className="pop-up">
          <div className="pop-up-main">
          <span onClick={closePopUp} className='exit-form'>X</span>
          <i className='bx bxs-check-circle bx-tada-hover'></i>
          <h2> Usuario <span style={isDelete ? {color: "red"} : {color:"greenyellow"}}>{isDelete ? "ELIMINADO" : "AGREGADO"}</span> con exito!</h2>
          </div>

          <button onClick={closePopUp}>Aceptar</button>
        </div>

      </div>
      }

    
    </div>
  )
}

export default App
