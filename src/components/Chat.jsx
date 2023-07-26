import Input from "./Input"
import Messages from "./Messages"

function Chat() {
  return (
    <div className="chat">
      <div className="chat-info">
        <span>John</span>
        <div className="chat-icons">
          <img src="/svg/camera-icon.svg" alt="camera"></img>
          <img src="/svg/add-user-icon.svg" alt="add-user"></img>
          <img src="/svg/ellipsis-icon.svg" alt="ellipsis"></img>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat