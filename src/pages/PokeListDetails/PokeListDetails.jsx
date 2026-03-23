import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function PokeDetailsPage (){

    const [pokemon, setPokemon] = useState({})

    const {pokeId} = useParams()

    const baseURL = 'https://pokemon-app-ca105-default-rtdb.europe-west1.firebasedatabase.app/resource'

    const getPokemon = () => {
        axios
            .get(`${baseURL}.json?orderBy="id"&equalTo="${pokeId}"`)
            .then((poke) => {
                const elPokemon = Object.values(poke.data)[0];
                setPokemon(elPokemon)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getPokemon()
    }, [pokeId])

    if (!pokemon) {
        return <p>Cargando datos del Pokémon...</p>;
    }

    return(
        <>
            <h1>Poke Details</h1>
            <p>{pokemon.name}</p>
            <p>{pokeId}</p>
        </>
    )
}

export default PokeDetailsPage