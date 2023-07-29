import LoadingButton from '../common/LoadingButton'
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import { v4 as uuid } from "uuid"
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

function Input() {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  const [sending, setSending] = useState(false)

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {
    setSending(true)

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        'state_changed',
        (snapshot) => { },
        (error) => { },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: text,
                img: downloadURL,
                senderId: currentUser.uid,
                date: Timestamp.now()
              })
            })
          });
        }
      );

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    setText("")
    setImg(null)
    setSending(false)
  }

  const handleOnKeyDown = (e) => {
    e.code === 'Enter' && handleSend()
  }

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Say something..."
        disabled={sending}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleOnKeyDown}
        value={text} />
      <div className="send">
        <img src="/svg/attach-icon.svg" alt="attach-icon" />
        <input
          type="file"
          style={{ display: 'none' }}
          disabled={sending}
          id="file-send"
          onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor="file-send">
          <img
            src="/img/add-image-icon.png"
            alt="add-icon" />
        </label>
        {
          !sending && <button disabled={text === "" && img === null} onClick={handleSend}>Send</button>
        }

        {
          sending && <LoadingButton style={{ width: '32px' }} />
        }
      </div>
    </div>
  )
}

export default Input