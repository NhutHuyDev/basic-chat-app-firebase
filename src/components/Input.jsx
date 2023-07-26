function Input() {
  return (
    <div className="input">
      <input type="text" placeholder="Say something..." />
      <div className="send">
        <img src="/svg/attach-icon.svg" alt="attach-icon"/>
        <input type="file" style={{ display: 'none' }} id="file-send" />
        <label htmlFor="file-send">
          <img src="/img/add-image-icon.png"  alt="add-icon"/>
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input