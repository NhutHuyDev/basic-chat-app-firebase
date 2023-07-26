import { auth } from "../firebase"
import { signOut } from "firebase/auth"

function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img src="/img/icon.png" alt="avatar"/>
        <span>Huy Nguyễn</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar