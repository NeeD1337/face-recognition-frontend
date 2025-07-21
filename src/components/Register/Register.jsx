import React, { useState } from 'react';

const Register = ({onRouteChange, loadUser}) => {
  const [registerInEmail, setRegisterEmail] = useState('');
  const [registerInPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');

  const onEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  };

  const onNameChange = (event) => {
    setRegisterName(event.target.value);
  }

    const onSubmitRegister = () => {
    fetch('https://face-recognition-backend-znpe.onrender.com/register',{
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: registerInEmail,
        password: registerInPassword,
        name: registerName
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id) {
        loadUser(user);
        onRouteChange('home');
      }
    })
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
    <main className="pa4 black-80 fade-in">
     <div className="measure">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
        <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="text" 
        name="name"  
        id="name"
        onChange={onNameChange}
        />
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address"  
        id="email-address"
        onChange={onEmailChange}
        />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password"  
        id="password"
        onChange={onPasswordChange}
        />
      </div>
    </fieldset>
    <div className="">
      <input 
      onClick={onSubmitRegister}
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit" 
      value="Register"/>
    </div>
  </div>
</main>
</article>
  );
}
export default Register;
