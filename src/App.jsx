import { useEffect, useState } from "react"
import axios from 'axios'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import PokeListPage from "./pages/PokelistPage/PokelistPage";
import PokeDetailsPage from "./pages/PokeListDetails/PokeListDetails";
import About from "./pages/AboutPage/AboutPage";
import Contact from "./pages/ContactPage/ContactPage";
import NotFound from "./pages/NotFoundPage/NotFoundPage";

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [pokemons, setPokemons] = useState([])


  useEffect(() => {
    axios
      .get('https://pokemon-app-ca105-default-rtdb.europe-west1.firebasedatabase.app/resource.json')
      .then((pokemon) => {
        const data = Object.keys(pokemon.data).map((id) => ({
        id,
        ...pokemon.data[id],
      }))

      setAllPokemons(data) 
      setPokemons(data) 
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

      

  return (
    <>

      <Header pokemonsArr={allPokemons} setPokemons={setPokemons} />

      <Routes>
        <Route path="/" element={<PokeListPage pokemonsArr={pokemons}></PokeListPage>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pokemons/:pokeId" element={<PokeDetailsPage></PokeDetailsPage>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
