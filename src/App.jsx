import { useEffect, useState } from "react"
import axios from 'axios'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFoundPage/NotFoundPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import AddPokemonPage from "./pages/AddPokemonPage/AddPokemonPage";

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [pokemons, setPokemons] = useState([])


  const getAllPokemons = () => {

    axios
      .get('https://pokemon-app-ca105-default-rtdb.europe-west1.firebasedatabase.app/resource.json')
      .then((pokemon) => {
        const data = Object.keys(pokemon.data).map((id) => ({
          id,
          ...pokemon.data[id],

        }))

        console.log(pokemon.data)

        setAllPokemons(data)
        setPokemons(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getAllPokemons()
  }, [])

  return (
    <>

      <Header pokemonsArr={allPokemons} setPokemons={setPokemons} />

      <Routes>
        <Route path="/" element={<PokeListPage pokemonsArr={pokemons}></PokeListPage>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/add" element={<AddPokemonPage pokemonsArr={pokemons} getAllPokemons={getAllPokemons} />} />
        <Route path="/pokemons/:pokeId" element={<PokeDetailsPage></PokeDetailsPage>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
