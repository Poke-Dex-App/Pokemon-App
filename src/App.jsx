import { useEffect, useState } from "react"
import axios from 'axios'
import PokemonCard from "./components/PokemonCard/PokemonCard";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import PokeListPage from "./pages/PokelistPage/PokelistPage";
import PokeDetailsPage from "./pages/PokeListDetails/PokeListDetails";

function App() {

  const [pokemons, setPokemons] = useState({})

  const pokemonsArr = Object.keys(pokemons).map((id) => ({
    id,
    ...pokemons[id],
  }));

  useEffect(() => {
    axios
      .get('https://pokemon-app-ca105-default-rtdb.europe-west1.firebasedatabase.app/resource.json')
      .then((pokemon) => {
        setPokemons(pokemon.data)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return (
    <>

      <Header/>

      <NavBar/>

      <Routes>
        <Route path="/"  element={<PokeListPage></PokeListPage>}/>
        <Route path="/pokemons/:pokeId" element={<PokeDetailsPage></PokeDetailsPage>}/>
      </Routes>

      {pokemonsArr.map((poke) => {
        return(
          <PokemonCard key={poke.id} poke={poke}/>
        )
      })}

      <Footer/>
    </>
  )
}

export default App
