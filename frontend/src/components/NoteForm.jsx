import { useState, useContext } from "react"
import AppContext from "../context/AppContext"

const NoteForm = () => {
  const [text, setText] = useState("")

  const { createNote } = useContext(AppContext)

  const onSubmit = (e) => {
    e.preventDefault()
    createNote({ text })
    setText("")
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Not Yaz..</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Notu Kaydet
          </button>
        </div>
      </form>
    </section>
  )
}
export default NoteForm
