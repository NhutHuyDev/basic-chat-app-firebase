function Search() {
  return (
    <div className="search">
      <div className="search-form">
        <img src="/svg/magnifying-glass-icon.svg" alt="magnifying-glass"></img>
        <input type="text" placeholder="Finding a user..."></input>
      </div>
      <div className="user-chat">
        <img src="/img/avatar.png" alt="avatar"/>
        <div className="user-chat-info">
          <span>Jane</span>
          <p>Nice to meet you!</p>
        </div>
      </div>
    </div>
  )
}

export default Search