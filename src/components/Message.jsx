import ImageComponent from "../common/ImageComponent"

function Message() {
  return (
    <div className="message">
      <div className="message-info">
        <div className="avatar-container">
          <img src="/img/avatar.png" alt="avatar" />
        </div>
        <span>Just now</span>
      </div>
      <div className="message-content">
        <p>hello</p>
        <ImageComponent src={'/img/sample-image.jpg'} alt="sample-img" />
      </div>
    </div>
  )
}

export default Message