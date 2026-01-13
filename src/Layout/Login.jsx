import React, { useState,useRef} from 'react';
import {auth} from '../component/firebase.init';
import { signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import { Link } from 'react-router-dom';
import Register from '../component/Register'
const Login = () => {
    const [success,setsuccess]=useState(false)
    const [errormessage,seterrormessage]=useState('')
    const emailref=useRef();
    const handlelogin = e =>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        console.log(email,password);
         setsuccess(false)
        seterrormessage('')
       
       signInWithEmailAndPassword(auth, email, password)
        .then(result => {
       // Signed up 
       console.log(result.user);
       if(!result.user.emailVerified){
        alert('please verify your email address')
       }else{
        setsuccess(true)
       }
       setsuccess(true)
    // ...
  })

  .catch(error => {
   seterrormessage(error.message);
});
    }

const handleforgetPassword = () =>{
      console.log(emailref.current.value);
      const email=emailref.current.value;
      seterrormessage('')
      
      sendPasswordResetEmail(auth, email)
     .then(() => {
    alert('A password reset email is sent.Please check your email')
  })
   .catch(error => {
    seterrormessage(error.message)
  })
}
    
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handlelogin} className="fieldset">
          <label className="label">Email</label>
          <input ref={emailref} type="email" className="input" placeholder="Email" name="email"/>
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" name="password"/>
          <div onClick={handleforgetPassword}><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <p >New to this Website? Please<Link to="/Register" className='text-blue-500 underline'>Sing Up</Link></p>
        {
            errormessage && <p className='text-red-500'>{errormessage}</p>
        }
        {
            success && <p className='text-green-600'>Login Successfully </p>
        }
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;