import { useState, useEffect, useContext } from "react"
import AppContext from "../context/AppContext"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"
import Spinner from "../components/Spinner"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const { loading, register } = useContext(AppContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const regFunc = async () => {
    const userData = {
      name,
      email,
      password,
    }
    await register(userData)
    navigate("/")
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error("Şifreler eşleşmiyor!")
    } else {
      regFunc()
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  if (loading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Kayıt Ol
        </h1>
        <p>Hesap Oluştur</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Adın"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="E-postan"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Şifren"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Şifreni doğrula"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Kayıt Ol
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Register
