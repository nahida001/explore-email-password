import React from 'react';
import {  createUserWithEmailAndPassword ,sendEmailVerification } from "firebase/auth";
import {auth} from '../component/firebase.init';
import Login from '../Layout/Login';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Register = () => {
  const [success,setsucess]=useState(false)
  const [errormessage,seterrormessage]=useState('')
  const [showpassword,setpassword]=useState(false)
  

    const handleRegister=e=>{
        e.preventDefault()
        const email=e.target.email.value;
        const password=e.target.password.value;
        const terms=e.target.terms.checked;
       // const  button=e.target.btn.value;
       console.log(email,password,terms);
         seterrormessage('')
         setsucess(false)
         //validation of password
         const passwordexpre=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
         if(passwordexpre.test(password)===false){
              seterrormessage('password must have one lowercase,one uppercase,one digit and 6 characters or longer')
              return;
         }
         if(!terms){
          seterrormessage("please accept our terms and condition")
          return
         }
        //create user
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
    // Signed up 
    console.log(result);
    sendEmailVerification(auth.currentUser)
    .then(() => {
      setsucess(true);
      alert('We sent you a verification email')

    });
    
  })
  .catch(error => {
    console.log(error);
    seterrormessage(error.message)
  })
   
 
}
  
    return  (
        <div className='max-w-sm mx-auto border mt-10'>
            <h1 className='text-center mt-2'>Sign Up</h1>
        <form onSubmit={handleRegister} className='p-4'>
          <div className='py-2'>
            <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  <input name='email'  type="email" placeholder="mail@site.com" required />
</label>
<div className="validator-hint hidden">Enter valid email address</div>
          </div>
        
            <label className="lebel mt-4">Password</label>
    
   <div className='relative'>
   <input
    type={showpassword?'text':'password'} name='password' className='input'
    placeholder="Password"
   
    />
     <button onClick={()=>{setpassword(!showpassword)}}
     className='btn btn-xs absolute right-9 top-2'>
      {
        showpassword ?<FaEyeSlash />:<FaEye/>
      }
     
     
     </button>
 </div>
       <div className='p-2 '>forget password?</div>


 <label class="label mt-2">
    <input type="checkbox" name="terms" class="checkbox" />
  Accepted terms & condition
  </label>
  <br/>
       <button className='btn btn-soft btn-primary' >Submit</button>
        </form>
        <p className='p-4'>Already have an account? Please <Link className="text-blue-500 underline" to='/Login'>Login</Link></p>
        {
          errormessage && <p className='text-red-700 p-2 text-center'>{errormessage}</p>
        }
        {
          success && <p className='text-emerald-300 text-center p-2'>User has Create Successfully{success}</p>
        }
        </div>
    );
};

export default Register;