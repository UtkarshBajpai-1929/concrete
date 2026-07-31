import Header from "../components/layout/Header"
import Hero from "../components/layout/Hero"
import ThemeButton from "../components/ThemeButton"
import Navigation from "../components/layout/Navigation"
function App() {

  return (
    <>
    <div className="min-h-screen min-w-full bg-(--bg) text-(--text)">
      <Header/>
      <Hero/>
      <Navigation/>
    </div>
    
    </>
  )
}

export default App
