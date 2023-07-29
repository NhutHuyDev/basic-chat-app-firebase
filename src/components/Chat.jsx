import { useContext } from "react"
import Input from "./Input"
import Messages from "./Messages"
import { ChatContext } from "../context/ChatContext"

function Chat() {
  const { data } = useContext(ChatContext)
  return (
    <div className="chat">
      <div className="chat-info">
        <span>{data.user?.displayName}</span>
        <div className="chat-icons">
          <img src="/svg/camera-icon.svg" alt="camera"></img>
          <img src="/svg/add-user-icon.svg" alt="add-user"></img>
          <img src="/svg/ellipsis-icon.svg" alt="ellipsis"></img>
        </div>
      </div>

      {
        data.chatId === 'null' ?
          <div style={{
            display: "flex",
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h1 style={{ marginTop: '240px' }}>Enjoy your converstarion!</h1>
          </div> :
          <>
            <Messages />
            <Input />
          </>
      }
    </div>
  )
}

export default Chat