import { useContext } from "react"
import AppContext from "../context/AppContext"

const NoteItem = ({ note }) => {
  const { deleteNote } = useContext(AppContext)

  return (
    <div className="goal">
      <div className="">{new Date(note.createdAt).toLocaleString()}</div>
      <h2>{note.text}</h2>
      <button onClick={() => deleteNote(note._id)} className="close">
        X
      </button>
    </div>
  )
}
export default NoteItem
