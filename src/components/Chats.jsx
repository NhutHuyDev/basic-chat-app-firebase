import { useContext, useEffect } from "react"
import { useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

function Chats() {
  const [userChats, setUserChats] = useState([])

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const getUserChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setUserChats(doc.data())
      })

      return () => {
        unsub()
      }
    }

    currentUser.uid && getUserChats()

  }, [currentUser.uid])

  return (
    <div className="chats">
      {
        Object.entries(userChats)?.map(userChat =>
          <div className="user-chat" key={userChat[0]}>
            <img src={userChat[1].userInfo.photoURL} alt="avatar" />
            <div className="user-chat-info">
              <span>{userChat[1].userInfo.displayName}</span>
              <p>{userChat[1].userInfo.lastMessage?.text}</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Chats