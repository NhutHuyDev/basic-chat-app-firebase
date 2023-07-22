function Search() {
  return (
    <div className="search">
      <div className="search-form">
        <img src="/svg/magnifying-glass-icon.svg"></img>
        <input type="text" placeholder="Finding a user..."></input>
      </div>
      <div className="user-chat">
        <img src="/img/avatar.png"/>
        <div className="user-chat-info">
          <span>Jane</span>
          <p>Nice to meet you!</p>
        </div>
      </div>
    </div>
  )
}

export default Search