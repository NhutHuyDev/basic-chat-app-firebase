import { useState } from "react"
import { db } from "../firebase"
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Search() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    setUser(null)
    setError(false)

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username))

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length) {
        querySnapshot.forEach((doc) => {
          setUser(doc.data())
        });
      } else {
        setUser({})
      }
    } catch (error) {
      setError(true)
    }
  }

  const handleKeyDown = (e) => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    // check whether the group (chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid ?
        currentUser.uid + user.uid :
        user.uid + currentUser.uid

    try {
      const res = await getDoc(doc(db, "chats", combinedId))

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] })

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })
      }

    } catch (error) {
      console.log(error)
    }

    setUser(null)
    setUsername("")
  }

  return (
    <div className="search">
      <div className="search-form">
        <img src="/svg/magnifying-glass-icon.svg" alt="magnifying-glass"></img>
        <input
          type="text"
          placeholder="Finding a user..."
          onKeyDown={handleKeyDown}
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
          onBlur={(e) => {
            setUser(null)
            setUsername("")
          }}></input>
      </div>

      {
        error
        &&
        <div className="user-chat">
          <div className="user-chat-info">
            <span>Something went wrong!</span>
          </div>
        </div>
      }

      {
        JSON.stringify(user) === '{}'
        &&
        <div className="user-chat">
          <div className="user-chat-info">
            <span>User is not found!</span>
          </div>
        </div>
      }

      {
        user
        &&
        JSON.stringify(user) !== '{}'
        &&
        <div className="user-chat" onClick={handleSelect}>
          <img src={user.photoURL} alt="avatar" />
          <div className="user-chat-info">
            <span>{user.displayName}</span>
          </div>
        </div>
      }

    </div>
  )
}

export default Search