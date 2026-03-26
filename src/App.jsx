import { useEffect, useState } from "react"
import axios from 'axios'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import PokeDetailsPage from "./pages/PokeListDetails/PokeListDetails";
import NotFound from "./pages/NotFoundPage/NotFoundPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import AddPokemonPage from "./pages/AddPokemonPage/AddPokemonPage";
import EditPage from "./pages/EditPage/EditPage";
import PokeListPage from "./pages/PokeListPage/PokeListPage"
import Login from './components/Login/Login'

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

        setAllPokemons(data)
        setPokemons([...data].reverse())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getAllPokemons()
  }, [])



  const normalOrder = () => {
    setPokemons(allPokemons)
  }

  const reverseOrder = () => {
    setPokemons([...allPokemons].reverse())
  }

  const randomOrder = () => {
    const shuffled = [...allPokemons]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setPokemons(shuffled)
  }
  return (

    <>

      <Header pokemonsArr={allPokemons} setPokemons={setPokemons} />

      <Login></Login>

      <Routes>
        <Route path="/" element={<PokeListPage 
                                  pokemonsArr={pokemons} 
                                  allPokemonsArr={allPokemons} 
                                  setPokemons={setPokemons} 
                                  normalOrder={normalOrder}
                                  reverseOrder={reverseOrder}
                                  randomOrder={randomOrder}
                                  />} 
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/add" element={<AddPokemonPage pokemonsArr={pokemons} getAllPokemons={getAllPokemons} />} />
        <Route path="/pokemons/:pokeId" element={<PokeDetailsPage getAllPokemons={getAllPokemons}></PokeDetailsPage>} />
        <Route path="/pokemons/edit/:pokeId" element={<EditPage pokemonsArr={pokemons} getAllPokemons={getAllPokemons} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App


