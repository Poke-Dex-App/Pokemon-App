import { useState } from "react"
import "./AddPokemonPage.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function AddPokemonPage({pokemonsArr, getAllPokemons}) {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [abilities, setAbilities] = useState([])
    const [imagen, setImagen] = useState("")
    const [types, setTypes] = useState([])
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [stats, setStats] = useState("")
    const [weaknesses, setWeaknesses] = useState([])
    const [moves, setMoves] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()


        const pokeIds = pokemonsArr.map((pokeObj) => {
            return pokeObj.id;
        })
        console.log(pokeIds)
        const maxId = Math.max(...pokeIds)
        console.log(maxId)
        const nextId = maxId + 1


        const newPokemon = {
            name: name,
            description: description,
            abilities: abilities,
            sprites: {
                front: imagen
            },
            types: types,
            weight: weight,
            height: height,
            stats: stats,
            weaknesses: weaknesses,
            moves: moves,
            id: String(nextId)
        }

        axios
            .post(`${BASE_URL}.json`, newPokemon)
            .then(() => {
                getAllPokemons()
                navigate("/")
            })
            .catch((error) => {
                console.log(error)
            })


    }

    const handleType = (e) => {
        const value = e.target.value
        setTypes([...types, value])
    }

    const handleWeaknesses = (e) => {
        const value = e.target.value
        setWeaknesses([...weaknesses, value])
    }

    const handleAbilities = (e) => {
        const value = {
            description: e.target.value
        }
        setAbilities([...abilities, value])
    }

    const handMoves = (e) => {
        const value = {
            name: e.target.value
        }
        setMoves([...moves, value])
    }



    return (

        <>
            <form onSubmit={handleSubmit}>

                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <label>
                    Descripción:
                    <textarea
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <label>
                    Habilidades:
                    <select
                        name="abilities"
                        onChange={handleAbilities}
                    >
                        <option value="value1">fuego</option>
                        <option value="value2">veneno</option>
                        <option value="value3">agua</option>
                    </select>
                </label>

                <label>
                    Imagen:
                    <input
                        type="url"
                        name="imagen"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                    />
                </label>

                <label>
                    Tipo:
                    <select
                        name="type"
                        onChange={handleType}
                    >
                        <option value="value1">fuego</option>
                        <option value="value2">veneno</option>
                        <option value="value3">agua</option>
                    </select>
                </label>

                <label>
                    Peso:
                    <input
                        type="number"
                        name="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </label>

                <label>
                    Altura:
                    <input
                        type="number"
                        name="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </label>

                <label>
                    Debilidades:
                    <select
                        name="weaknesses"
                        onChange={handleWeaknesses}
                    >
                        <option value="value1">roca</option>
                        <option value="value2">aire</option>
                        <option value="value3">lucha</option>
                    </select>
                </label>

                <label>
                    Movimientos:
                    <select
                        name="moves"
                        onChange={handMoves}
                    >
                        <option value="value1">Value 1</option>
                        <option value="value2">Value 2</option>
                        <option value="value3">Value 3</option>
                        <option value="value3">Value 4</option>
                        <option value="value3">Value 5</option>
                    </select>
                </label>

                <button>CREATE</button>



            </form>

        </>
    )
}

export default AddPokemonPage