import { useState } from "react"
import "./AddPokemonPage.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function AddPokemonPage({ pokemonsArr, getAllPokemons }) {

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

        const randomStat = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min).toString();

        const baseStats = {
            hp: randomStat(40, 100),
            attack: randomStat(40, 100),
            defense: randomStat(40, 100),
            special_attack: randomStat(40, 100),
            special_defense: randomStat(40, 100),
            speed: randomStat(40, 100),
        };

        const maxStats = {
            hp: randomStat(200, 300),
            attack: randomStat(200, 300),
            defense: randomStat(200, 300),
            special_attack: randomStat(200, 300),
            special_defense: randomStat(200, 300),
            speed: randomStat(200, 300),
        };


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
            stats: {
                base_stats: baseStats,
                max_stats: maxStats
            },
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
        const value = e.target.value

        const selectedAbility = unicAbilities.find(ability => ability.description === value);

        setAbilities([...abilities, selectedAbility])
    }

    const handMoves = (e) => {
        const value = e.target.value

        const selectedMove = unicMoves.find(move => move.description === value);

        setMoves([...moves, selectedMove])
    }

    const pokeAbilities = pokemonsArr.map((poke) => {
        return poke.abilities
    })

    const allAbilities = [].concat(...pokeAbilities);

    const unicAbilities = allAbilities.filter((ability, i, array) => {
        const firstI = array.findIndex((index) => index.description === ability.description)

        return i === firstI
    })

    const pokeTypes = pokemonsArr.map((poke) => {
        return poke.types
    })

    const allTypes = [].concat(...pokeTypes);

    const unicTypes = allTypes.filter((type, i, array) => {
        const firstI = array.findIndex((index) => index === type)

        return i === firstI
    })

    const pokeWeaknesses = pokemonsArr.map((poke) => {
        return poke.weaknesses
    })

    const allWeaknesses = [].concat(...pokeWeaknesses);

    const unicWeaknesses = allWeaknesses.filter((weaknes, i, array) => {
        const firstI = array.findIndex((index) => index === weaknes)

        return i === firstI
    })

    const pokeMoves = pokemonsArr.map((poke) => {
        return poke.moves
    })

    const allMoves = [].concat(...pokeMoves);

    const unicMoves = allMoves.filter((move, i, array) => {
        const firstI = array.findIndex((index) => index.description === move.description)

        return i === firstI
    })

    return (

        <div className="form-add-edit">
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
                        <option>habilidad</option>
                        {unicAbilities.map((ability) => {
                            return <option value={ability.description}>{ability.description}</option>
                        })}
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
                        <option>tipo</option>
                        {unicTypes.map((type) => {
                            return <option value={type}>{type}</option>
                        })}
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
                        <option>debilidad</option>
                        {unicWeaknesses.map((weaknes) => {
                            return <option value={weaknes}>{weaknes}</option>
                        })}
                    </select>
                </label>

                <label>
                    Movimientos:
                    <select
                        name="moves"
                        onChange={handMoves}
                    >
                        <option>movimiento</option>
                        {unicMoves.map((move) => {
                            return <option value={move.description}>{move.description}</option>
                        })}
                    </select>
                </label>

                <button>CREATE</button>



            </form>

        </div>
    )
}

export default AddPokemonPage