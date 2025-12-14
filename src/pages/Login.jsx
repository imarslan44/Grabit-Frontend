import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const Login = ({type}) => {
const [Type, setType] = useState("new");
const [FormData, setFormDta] = useState({
  name: "",
  email: "",
  password: "",
});

const HandleFormData = (e) =>{
  const {name, value } = e.target;

  setFormDta((pre)=>{
    return {...pre,  [name]: value}
  })
}

  return (
    <div className="w-screen h-screen bg-primary-2 flex items-center justify-center relative">
      <Link to="/" className="outline-2 rounded p-2 position absolute top-10 left-10"> <ion-icon name="arrow-back-outline"></ion-icon> Back</Link>
      {
        Type === "new" ? ( 
          <form className="border-2 rounded-sm flex flex-col p-8">
            <h1 className="w-full text-center font-semibold text-lg py-2 text-secondary-2">SignUp</h1>
            <input value={FormData.name} onChange={HandleFormData} type="text" name="name"  placeholder="Full Name" required/>
            <input value={FormData.email} onChange={HandleFormData} type="email" name="email" placeholder="Email" required/>
            <input value={FormData.password} onChange={HandleFormData} type="password" name="password" placeholder="Password" required/> 
            <p className="w-full flex justify-between text-gray-500 text-xs">Alread have an account? <button className="cursor-pointer underline" onClick={()=>setType("old")}>SignIn</button></p>
            <button className="w-full p-2 font-medium  bg-secondary-1 border-2 text-primary-2 rounded cursor-pointer" type="submit" >SignUp</button> 
          </form>
        ) : (
          <form className="border-2 rounded-sm flex flex-col px-4 py-6">
            <h1 className="w-full text-center font-semibold text-lg py-2 text-secondary-2">SignIn</h1>
            <input value={FormData.email} onChange={HandleFormData} type="email" name="email" placeholder='Email' required/>
            <input value={FormData.password} onChange={HandleFormData} type="password" name="password" placeholder='Password' required/>
            <p className="w-full flex justify-between text-xs text-gray-500">Don't have an account? <button className='cursor-pointer underline' onClick={()=>setType("new")}>SignUp</button></p>
            <button className="w-full p-1 rounded font-medium  bg-secondary-1 border-2 text-primary-2" type="submit">SingIn</button>
          </form>
        )
      }  
    
    </div>
  )
}

export default Login