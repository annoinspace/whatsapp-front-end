import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import MainPage from "./components/main-page/MainPage"

// import Test from "./components/main-page/Test"

function App() {
  const user = useSelector((state) => state.loadedProfile.currentUser)

  useEffect(() => {
    if (user) {
      console.log("User has logged in.")
    } else {
      console.log("User has logged out.")
    }
  }, [user])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {user ? <Route path="/home" element={<MainPage />} /> : <Route path="/" element={<SignUp />} />}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
