import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = (props) => {

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { register, error, clearError, isAuthenticated } = authContext;

  useEffect(() => {
    if(isAuthenticated) {
      setAlert('User signed in successfully.', 'success')
      props.history.push('/')
    }
    if(error !== null){
      setAlert(error, 'danger')
      clearError();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    if(name === '' || email === '' || password === ''){
      setAlert('Please enter all fields.', 'danger')
    }else if(password !== password2) {
      setAlert('Password do not match.', 'danger')
    }else{
      register({
        name,
        email,
        password
      })
    }
  }

  return (
    <div className="form-container">
      <h1>Account <span className="text-primary">Register</span></h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Name..." value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email..." value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password..." value={password} onChange={onChange} required minLength="6" />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" placeholder="Confirm Password..." value={password2} onChange={onChange} required minLength="6" />
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Register
