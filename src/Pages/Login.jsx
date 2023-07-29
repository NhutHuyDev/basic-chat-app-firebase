import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoadingButton from "../common/LoadingButton";

function Login() {
  const navigate = useNavigate()
  const [loadedLogin, setLoadedLogin] = useState(true)
  const [error, setError] = useState(false)

  const handleOnSubmit = async (e) => {
    setLoadedLogin(false)
    setError(false)
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setLoadedLogin(true)
      navigate("/")
    } catch (error) {
      setLoadedLogin(true)
      setError(true)
    }

  }

  return (
    <>
      <div className='form-container'>
        <div className='form-wapper'>
          <span className='logo'>Chat App</span>
          <span className='title'>Login</span>
          <form onSubmit={handleOnSubmit}>
            <input type='email' placeholder='Your email' />
            <input type='password' placeholder='Password' />
            {loadedLogin && <button>Sign in</button>}
            {!loadedLogin && <LoadingButton />}
            {error && <span style={{ color: 'red' }}>Something went wrong!</span>}
          </form>
          <p>You don't have any account? <Link to='/register'>Register</Link></p>
        </div>
      </div>
    </>
  )
}

export default Login