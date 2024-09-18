import React, { useState } from "react";
import {  useNavigate} from "react-router-dom";
const Login=(props)=>{
     const [credentials,setCredentials]=useState({email:"",password:""});
     //old version me useHistory use hoti thi ab use navigate hota hia
     let navigate=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
     
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
                    },
                    body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          console.log(json)
          if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken)
            props.showAlert("Logged in Successfully","Success")
            navigate('/');
          }
          else{
            props.showAlert("invalid credentials","danger")
          }
    }
    const onChanges=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return(
    <div>
         <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email"  className="form-label">Email address</label>
    <input type="email" onChange={onChanges} className="form-control" value={credentials.email} name="email" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="password"  className="form-label">Password</label>
    <input type="password"  onChange={onChanges}className="form-control"value={credentials.password} name="password" id="password"/>
  </div>
 
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>
         
    </div>
    )
}
export default Login;