import React, { useState } from "react";
import { Redirect, Link} from "react-router-dom";
import axios from 'axios';

const Register = (props) => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [pswd, setPswd] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg,setMsg] = useState("");

  const token = localStorage.getItem('token');

  // Submit a user to json-server -> db.json with form values & roles
  const submitRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMsg("Creating user...");
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/users',
      data: {
        name,surname,mail,pswd,roles:["AccessDashboard","AccessProducts"]
      },
    }).then(function (response) {
      setLoading(false);
      setMsg("User created succesfully..");
    })
    .catch(function (error) {
      setLoading(false);
      setMsg("Ooppps.. Please try again.");
    });
  }

  if(token) return <Redirect to="/dashboard" />
  else return  (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form  onSubmit={submitRegister}>
          <h3>Sign Up</h3>
          <div className="form-group">
              <label>First name</label>
              <input type="text" className="form-control" placeholder="First name" name="name" onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
              <label>Last name</label>
              <input type="text" className="form-control" placeholder="Last name" name="surname" onChange={e => setSurname(e.target.value)} />
          </div>
          <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" name="mail" onChange={e => setMail(e.target.value)} />
          </div>
          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={e => setPswd(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          <p className="forgot-password text-right">
              Already registered ? <Link to="/login">Sign In</Link>
          </p>
          <p>{msg}</p>
        </form>
      </div>
    </div>
  )
}
export default Register;