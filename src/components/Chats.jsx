import { useContext, useEffect } from "react"
import { useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

function Chats() {
  const [userChats, setUserChats] = useState([])

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

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

  const handleSelect = (userInfo) => {
    dispatch({type: "CHANGE_USER", payload: userInfo})
  }

  return (
    <div className="chats">
      {
        Object.entries(userChats)?.sort((a, b) => b[1].date - a[1].date).map(userChat =>
          <div className="user-chat" key={userChat[0]} onClick={() => handleSelect(userChat[1].userInfo)}>
            <img src={userChat[1].userInfo.photoURL} alt="avatar" />
            <div className="user-chat-info">
              <span>{userChat[1].userInfo.displayName}</span>
              <p>{userChat[1].lastMessage?.text}</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Chats