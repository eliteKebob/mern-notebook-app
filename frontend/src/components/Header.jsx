import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import AppContext from "../context/AppContext"

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const { logout } = useContext(AppContext)

  const onLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="header">
      <div className="Logo">
        <Link to="/">Notebook</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Çıkış Yap
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Giriş Yap
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Kayıt Ol
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
export default Header
