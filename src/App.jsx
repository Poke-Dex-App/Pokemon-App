import { useEffect, useState } from "react"
import axios from 'axios'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import PokeListPage from "./pages/PokelistPage/PokelistPage";
import PokeDetailsPage from "./pages/PokeListDetails/PokeListDetails";

function App() {

  const [pokemons, setPokemons] = useState({})

  useEffect(() => {
    axios
      .get('https://pokemon-app-ca105-default-rtdb.europe-west1.firebasedatabase.app/resource.json')
      .then((pokemon) => {
        setPokemons(pokemon.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])



  return (
    <>

      <Header/>

      <Routes>
        <Route path="/"  element={<PokeListPage pokemonsArr={pokemons}></PokeListPage>}/>
        <Route path="/about"/>
        <Route path="/contact"/>
        <Route path="/pokemons/:pokeId" element={<PokeDetailsPage></PokeDetailsPage>}/>
        <Route path="*" element/>
      </Routes>

      <Footer/>
    </>
  )
}

export default App
