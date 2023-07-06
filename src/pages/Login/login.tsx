import { useDispatch, useSelector} from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import {fetchLogin} from "../../features/loginSlice";
import { AppDispatch, RootState } from "../../app/store";
import { Link, useNavigate } from 'react-router-dom';
import { LogUser } from "../../features/loginSlice";
import {decodeToken} from "react-jwt";
import './login.scss';

export default function Login(){
    const dispatch:AppDispatch = useDispatch()
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const logedin:any = token && decodeToken(token);
    let error = useSelector((state: RootState) => state.login.error);
    const [user,setUser] = useState<LogUser>({
        email: "",
        password: ""
    })

    function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        dispatch(fetchLogin(user))
        if(logedin){
            navigate('/shop')
        }
            setUser({ email: "", password: "" });
        //error = "";
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        setUser((prevData)=>({
            ...prevData,
           [e.target.name] : e.target.value 
        }))
    }

    return(
        <div className="login-form-bd">
            <div className="form-wrapper">
            <div className="form-container">
            <h1>Please Sign In</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-control">
                <input type="email" placeholder="email" name="email" required value={user.email} onChange={handleChange}/>
            </div>
            <div className="form-control">
                <input type="password" placeholder="password" name="password" required value={user.password} onChange={handleChange}/>
            </div>
            {error && <p className="errMsg">{error.slice(6)}</p>}
                <button className="login-btn" type="submit">Sign In</button>
                <p className="text">Don't have an account?</p> <Link to ="/register">Sign Up</Link> 
            </form>
            </div>
            </div>
        </div>
    )
}
