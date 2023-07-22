function Register() {
    return (
        <div className='form-container'>
            <div className='form-wapper'>
                <span className='logo'>Chap App</span>
                <span className='title'>Register</span>
                <form>
                    <input type='text' placeholder='Your username'/>
                    <input type='email' placeholder='Your email'/>
                    <input type='password' placeholder='Password'/>
                    <input style={{display: 'none'}} type='file' id='file'/>
                    <label htmlFor='file'>
                        <img src="img/add-image-icon.png" alt='Add image icon'/>
                        <span>Add your avatar</span>
                    </label>
                    <button>Sign up</button>
                </form>
                <p>You do have an account? Login</p>
            </div>
        </div>
    )
}

export default Register