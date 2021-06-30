import React,{useEffect,useState} from "react";
import axios from 'axios';
import {
  Link,
  useHistory,
  Redirect
} from "react-router-dom";
import {ROLES} from '../../../helpers/enums';

const Users = (props) => {

  const history = useHistory();
  // Getting user's roles from local storage
  // Normally, user roles must get from web service and must set to a global store like redux.
  // So we can access this roles whereever we want to use
  // But in this example we have no rest api so we store and call the roles from local storage
  const token = localStorage.getItem('token');
  const roles = localStorage.getItem('userRoles') && localStorage.getItem('userRoles').split(",");
  const [role,hasRole] = useState(false)

  const [users,setUsers] = useState([])

  // When logout , we must kill the token and remove the user roles from local storage
  // If we want to access to private pages later we must be login again
  const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("userRoles");
    history.push('/login')
  }

  const getUsers = async () => {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3000/users',
    })
    .then(function (response) {
      setUsers(response.data)
      })
    .catch(function (error) {
      console.log(error)
    });
  }

  // We control if user has access a role - ROLES.AccessProduct - to view the content in this page
  const hasAccessToPage = () =>{
    if(token && roles.indexOf(ROLES.AccessUsers) > -1){
      hasRole(true);
      getUsers()
    }
    else hasRole(false);
  }

  useEffect(() => {
    hasAccessToPage()
  },[role]);

  if(!token) return <Redirect to="/login" />
  else return (
    <div className="content">
      <div className="top">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/users">Users</Link>  
      </div>
      {/*
        Controlling if user has role to access this page's content
        If false, we show an access message
        If true, we show the content
      */}
      {
        !role ? 
          <div className="bottom">Sorry, you don't have access to view this page!</div>
          :
          <div className="bottom">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">Mail</th>
                  <th scope="col">Roles</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((v,k)=>
                    <tr key={k}>
                      <th scope="row">{v.id}</th>
                      <td>{v.name}</td>
                      <td>{v.surname}</td>
                      <td>{v.mail}</td>
                      <td>{v.roles.map((v,k) => <div key={k}>{v}</div>)}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
      }
      <div className="logout" onClick={logout}>Logout</div>
    </div>
  )

}
  
export default Users;