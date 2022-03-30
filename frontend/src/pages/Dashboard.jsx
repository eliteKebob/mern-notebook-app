import { useContext, useEffect } from "react"
import AppContext from "../context/AppContext"
import NoteForm from "../components/NoteForm"
import NoteItem from "../components/NoteItem"
import Spinner from "../components/Spinner"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { notes, getNotes, loading } = useContext(AppContext)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Hoşgeldin {user && user.name}</h1>
        <p>Not oluştur & görüntüle</p>
      </section>

      <NoteForm />

      <section className="content">
        {notes?.length > 0 ? (
          <div className="goals">
            {notes.map((note) => (
              <NoteItem key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <button className="btn btn-block" onClick={() => getNotes()}>
            Notlarımı Göster
          </button>
        )}
      </section>
    </>
  )
}
export default Dashboard
