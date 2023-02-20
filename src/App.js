import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import MainPage from "./components/main-page/MainPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
