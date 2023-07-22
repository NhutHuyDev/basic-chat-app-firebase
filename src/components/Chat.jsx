import Input from "./Input"
import Messages from "./Messages"

function Chat() {
  return (
    <div className="chat">
      <div className="chat-info">
        <span>John</span>
        <div className="chat-icons">
          <img src="/svg/camera-icon.svg"></img>
          <img src="/svg/add-user-icon.svg"></img>
          <img src="/svg/ellipsis-icon.svg"></img>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat