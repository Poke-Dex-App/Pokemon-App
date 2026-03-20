import { useEffect, useState } from "react"
import axios from 'axios'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

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

      {pokemonsArr.map((poke) => {
        return(
          <div key={poke.id}>
            <p>{poke.name}</p>
          </div>
        )
      })}

      <Footer/>
    </>
  )
}

export default App
