import { useDispatch, useSelector} from "react-redux";
import {fetchRegister} from "../../features/registerSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { AppDispatch, RootState } from "../../app/store";
import { Link } from 'react-router-dom';
import './registration.scss';

export default function Registration() {
  const dispatch: AppDispatch = useDispatch();
  const {error} = useSelector((state:RootState) => state.users);
  
  const [user,setUser] = useState({
    userName:"",
    email: "",
    password: ""
  });
 
  function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    dispatch(fetchRegister(user));
    setUser({
            userName:"",
            email: "",
            password: ""
    })
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setUser((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };


  return(
    <div className="register-form-bd">
            <div className="form-wrapper">
            <div className="form-container">
            <h1>Please Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-control">
                <input type="text" placeholder="username" name="userName" required value={user.userName} onChange={handleChange}/>
            </div>
            <div className="form-control">
                <input type="email" placeholder="email" name="email" required value={user.email} onChange={handleChange}/>
            </div>
            <div className="form-control">
                <input type="password" placeholder="password" name="password" required value={user.password} onChange={handleChange}/>
            </div>
            {error && <p className="errMsg">{error.slice(6)}</p>}
                <button className="register-btn" type="submit">Sign Up</button>
                <p className="text">Already have an account?</p> <Link to ="/login">Sign In</Link> 
            </form>
            </div>
            </div>
        </div>
  )
}


