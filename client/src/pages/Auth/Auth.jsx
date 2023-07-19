import React, { useState } from 'react'
import './Auth.css'
import logo from '../../assets/favicon.ico'
import AboutAuth from './AboutAuth'
import { signUp, logIn } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
	const [isSignup, setIsSignup] = useState(false)
	const [name, setName]	= useState("")
	const [ email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSwitch = ()=>{
		setIsSignup(!isSignup)
	}

	const handleSubmit = (e) =>{
		e.preventDefault()
		if(!email && !password){
			alert('Enter email and password')
		}
		
		if(isSignup){
			if(!name)
			{
				alert('Enter a name')
			}
			dispatch(signUp({name, email, password}, navigate))
		}
		else{
			dispatch(logIn({email, password}, navigate))
		}

	}

  	return (
    	<section className='auth-section'>
			{ isSignup && <AboutAuth /> }
			<div className='auth-container-2'>
				{ !isSignup && <img src={logo} alt='stack overflow' className='login-logo'/>}
				
				<form onSubmit={handleSubmit}>
					{
						isSignup && (
							<label htmlFor="">
								<h4>Display Name</h4>
								<input type='text' id='name' name='name' onChange={(e) => {setName(e.target.value)}}/>
							</label>
						)
							
						
					}
					<label htmlFor='email'>
						<h4>Email</h4>
						<input type='email' name='email' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
					</label>
					<label htmlFor='password'>
						<div style={{display: 'flex', justifyContent:'space-between'}}>
							<h4>Password</h4>
							{ !isSignup && <p style={{color: "#007ac6", fontSize: "13px"}}>Forgot password</p>}
						</div>
						<input type='password' name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
						{isSignup && <p style={{color: "#666767", fontSize: "13px"}}>Password length must be at least 10 characters long</p>}
					</label>
					{isSignup && (
						<label htmlFor='check'>
							<input type="checkbox" id='check' />
							<p style={{fontSize: "13px"}}>Remember me</p>
						</label>
					)}
					<button type='submit' className='auth-btn'>{ isSignup? 'Sign up': 'Login'}</button>
					{
						isSignup && (
							<p style={{color: "#666767", fontSize: "13px"}}>
								By clicking "Sign Up", you agree to our
								<span style={{color: "#007ac6"}}>terms of<br/> service</span>, 
								<span style={{color: "#007ac6"}}>privacy policy</span> and 
								<span style={{color: "#007ac6"}}>cookie policy</span>
							</p>
						)
					}
				</form>
				<p>{isSignup?'already have an account':"Don't have an account?"}
				<button type='button' className='handle-Switch-btn' onClick={handleSwitch}>{isSignup?"Log in":"Sign up"}</button></p>
				</div>
				
			

		</section>
  	)
}

export default Auth