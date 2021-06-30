import React, { useState } from "react";
import { useHistory,withRouter , Redirect, Link} from "react-router-dom";
import axios from 'axios';

const Login = (props) => {

  const history = useHistory();
  
  const [mail, setMail] = useState("");
  const [pswd, setPswd] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg,setMsg] = useState("");

  const token = localStorage.getItem('token');

  // Submit Login to json-server -> db.json & set token, user roles to local storage
  // Normally we have to use a backend server to check if user is in db and password is correct
  // But we don't have a remote server so we make this controls on front-end and set roles, token in local storage
  const submitLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMsg("Signing in.. Please wait..");
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3000/users',
    }).then(function (response) {
      let userMail = response.data.filter(v=>v.mail === mail)
      if(userMail && userMail.length){
        let userPswd = userMail[0].password
        if(userPswd === pswd){
          // Setting token and roles to local storage and after successfully login with credientials, redirecting to 'Dashboard' page
          localStorage.setItem("token", "user has token");
          localStorage.setItem("userRoles", userMail[0].roles);
          history.push("/dashboard");
        }
      }
      else{
        setMsg("There is no such a user.. Please try different one.")
      }
    }).catch(function (error) {
      setMsg(error)
    });
  }

  if(token) return <Redirect to="/dashboard" />
  else return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={submitLogin}>
              <h3>Sign In</h3>
              <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" placeholder="Enter email" name="mail" onChange={e => setMail(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Enter password" name="pswd" onChange={e => setPswd(e.target.value)} />
              </div>
              <div className="form-group">
                  <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" />
                      <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                  </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Submit</button>
              <p className="forgot-password text-right">
                Don't you have an account yet ? <Link to="/register">Register</Link>
              </p>
              <div>{msg}</div>
          </form>
      </div>
    </div>
  )
}
export default withRouter(Login);