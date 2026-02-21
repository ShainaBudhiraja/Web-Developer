import { useState } from "react"
import './Login.css'
const Login = () => {
    const [data,setData]=useState({
        name:'',
        email:'',
        password:''
    })

    function handleChange(e){
        const {name,value}=e.target;
        setData(prev=>({...prev,[name]:value}));
    };
    function handleSubmit(e){
        e.preventDefault();
        console.log("data",data);
    };
    function handleReset(){
        setData({
            name:'',
            email:'',
            password:''
        })
    }
    return (
        <>
            <div className="form">
                <input type="text" value={data.name} required onChange={handleChange} placeholder="Enter Name" className="form-items" name="name"/><br/>
                <input type="email" value={data.email} required onChange={handleChange} placeholder="Enter Email" className="form-items" name="email" /><br />
                <input type="password" value={data.password} required onChange={handleChange} placeholder="Enter Password" className="form-items" name="password" /><br />
                <button className="btn" type="submit" onClick={handleSubmit}>Submit</button><br />
                <button className="btn" type="reset" onClick={handleReset}>Reset</button>
            </div>
        </>
    )
}
export default Login
