import { useState, useEffect, useContext } from "react"
import AppContext from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { FaUser } from "react-icons/fa"
import Spinner from "../components/Spinner"

const Login = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const { loading, login } = useContext(AppContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const loginFunc = async () => {
    const userData = {
      email,
      password,
    }
    await login(userData)
    navigate("/")
  }

  const onSubmit = (e) => {
    e.preventDefault()
    try {
      loginFunc()
    } catch (error) {
      console.log(error)
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
          <FaUser /> Giriş Yap
        </h1>
        <p>Oturum Aç</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button type="submit" className="btn btn-block">
              Giriş Yap
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Login
