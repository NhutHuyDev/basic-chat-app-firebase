import { useState } from "react";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, 'avatar-' + res.user.uid);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed', 
                (snapshot) => { },
                (error) => {
                    console.log(error)
                    setError(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName: displayName,
                            photoURL: downloadURL,
                        })

                        //Create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //Create userChats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {})

                        //Navigate to home page
                        navigate("/")
                    });
                }
            );

        } catch (error) {
            console.log(error)
            setError(true)
        }


    }

    return (
        <div className='form-container'>
            <div className='form-wapper'>
                <span className='logo'>Chap App</span>
                <span className='title'>Register</span>
                <form onSubmit={handleOnSubmit}>
                    <input type='text' placeholder='Your username' />
                    <input type='email' placeholder='Your email' />
                    <input type='password' placeholder='Password' />
                    <input style={{ display: 'none' }} type='file' id='file' />
                    <label htmlFor='file'>
                        <img src="img/add-image-icon.png" alt='Add icon' />
                        <span>Add your avatar</span>
                    </label>
                    <button>Sign up</button>
                    {error && <span>Something went wrong!</span>}
                </form>
                <p>You do have an account? Login</p>
            </div>
        </div>
    )
}

export default Register