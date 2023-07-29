import { useContext, useEffect, useRef } from "react"
import ImageComponent from "../common/ImageComponent"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"

function Message({ message }) {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  const convertTimestamp = (timestamp) => {
    const sentDate = timestamp.toDate()
    const now = new Date()

    if (now.getDate() === sentDate.getDate() && 
      now.getMonth() === sentDate.getMonth() && 
      now.getFullYear() === sentDate.getFullYear()) {
      return sentDate.getHours() + ':' + sentDate.getMinutes() 
    } else {
      return sentDate.getDate() + '/' + sentDate.getMonth() + '/' + sentDate.getFullYear()
    }
    
  }

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="message-info">
        <div className="avatar-container">
          <img
            src={
              message.senderId === currentUser.uid ?
                currentUser.photoURL : data.user.photoURL
            }
            alt="avatar" />
        </div>
        <span className="message-date">{convertTimestamp(message.date)}</span>
      </div>
      <div className="message-content">
        {message.text &&
          <p>{message.text}</p>
        }

        {message.img &&
          <ImageComponent src={message.img} alt="sent-img" />
        }
      </div>
    </div>
  )
}

export default Message