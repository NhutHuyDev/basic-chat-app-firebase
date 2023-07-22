function Login() {
  return (
    <>
      <div className='form-container'>
        <div className='form-wapper'>
          <span className='logo'>Chap App</span>
          <span className='title'>Login</span>
          <form>
            <input type='email' placeholder='Your email' />
            <input type='password' placeholder='Password' />
            <button>Sign in</button>
          </form>
          <p>You don't have any account? Register</p>
        </div>
      </div>
    </>
  )
}

export default Login