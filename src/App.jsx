import { useEffect, useState } from "react"
import axios from 'axios'
import PokemonCard from "./components/PokemonCard/PokemonCard";

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
      <h1>POKEMON-APP</h1>
      {pokemonsArr.map((poke) => {
        return(
          <PokemonCard key={poke.id} poke={poke}/>
        )
      })}
    </>
  )
}

export default App
