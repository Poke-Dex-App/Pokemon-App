import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import './EditPage.css'

function EditPage({ pokemonsArr, getAllPokemons }) {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate()
    const { pokeId } = useParams()

    const [pokemon, setPokemon] = useState(null)

    const getPokemon = () => {
        axios
            .get(`${BASE_URL}.json?orderBy="id"&equalTo="${pokeId}"`)
            .then((poke) => {
                const elPokemon = Object.values(poke.data)[0];
                setPokemon(elPokemon)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getPokemon()
    }, [pokeId])

    const abilities = pokemonsArr.map((poke) => {
        return poke.abilities
    })

    const allAbilities = [].concat(...abilities);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPokemon({
            ...pokemon,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .get(`${BASE_URL}.json?orderBy="id"&equalTo="${pokeId}"`)
            .then((response) => {
                const key = Object.keys(response.data)

                const firebaseKey = key[0]

                const putURL = `${BASE_URL}/${firebaseKey}.json`

                return axios.put(putURL, pokemon)
            })
            .then(() => {
                getAllPokemons()
                navigate("/")
            })
            .catch((error) => console.log(error))
    }

    const handleAbilities = (value, i) => {
        const fullAbility = unicAbilities.find((ability) => ability.description === value)
        const newAbilities = [...pokemon.abilities]
        newAbilities[i] = fullAbility

        setPokemon({
            ...pokemon,
            abilities: newAbilities
        })
    }

    const handleMoves = (value, i) => {
        const fullMove = unicMoves.find((move) => move.description === value)
        const newMoves = [...pokemon.moves]
        newMoves[i] = fullMove

        setPokemon({
            ...pokemon,
            moves: newMoves
        })
    }

    const handleType = (value, i) => {
        const newTypes = [...pokemon.types]
        newTypes[i] = value

        setPokemon({
            ...pokemon,
            types: newTypes
        })
    }

    const handleWeaknesses = (value, i) => {
        const newWeaknesses = [...pokemon.weaknesses]
        newWeaknesses[i] = value

        setPokemon({
            ...pokemon,
            weaknesses: newWeaknesses
        })
    }

    if (!pokemon) {
        return <p>Cargando datos del Pokémon...</p>;
    }

    return (
        <div className="form-add-edit">
            <form onSubmit={handleSubmit}>

                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={pokemon.name}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Descripción:
                    <textarea
                        type="text"
                        name="description"
                        value={pokemon.description}
                        onChange={handleChange}
                    />
                </label>

                <div className="form-row">
                    {pokemon.abilities.map((ab, i) => {
                        return (
                            <label key={i}>
                                Habilidades {i + 1}:
                                <select
                                    name="abilities"
                                    value={ab.description}
                                    onChange={(e) => { handleAbilities(e.target.value, i) }}
                                >
                                    {unicAbilities.map((ability) => {
                                        return <option value={ability.description}>{ability.description}</option>
                                    })}
                                </select>
                            </label>
                        )
                    })}
                </div>

                <div className="form-row">
                    {pokemon.types.map((tp, i) => {
                        return (
                            <label key={i}>
                                Tipo {i + 1}:
                                <select
                                    name="type"
                                    value={tp}
                                    onChange={(e) => { handleType(e.target.value, i) }}
                                >
                                    {unicTypes.map((type, i) => {
                                        return <option key={i} value={type}>{type}</option>
                                    })}
                                </select>
                            </label>
                        )
                    })}
                </div>

                <label>
                    Peso:
                    <input
                        type="number"
                        name="weight"
                        value={pokemon.weight}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Altura:
                    <input
                        type="number"
                        name="height"
                        value={pokemon.height}
                        onChange={handleChange}
                    />
                </label>

                <div className="form-row">
                    {pokemon.weaknesses.map((wk, i) => {
                        return (
                            <label key={i}>
                                Debilidades {i + 1}:
                                <select
                                    name="weaknes"
                                    value={wk}
                                    onChange={(e) => { handleWeaknesses(e.target.value, i) }}
                                >
                                    {unicWeaknesses.map((weaknes) => {
                                        return <option value={weaknes}>{weaknes}</option>
                                    })}
                                </select>
                            </label>
                        )
                    })}
                </div>

                <div className="form-row">
                    {pokemon.moves.map((mv, i) => {
                        return (
                            <label key={i}>
                                Movimiento {i + 1}:
                                <select
                                    name="moves"
                                    value={mv.description}
                                    onChange={(e) => { handleMoves(e.target.value, i) }}
                                >
                                    {unicMoves.map((move) => {
                                        return <option value={move.description}>{move.description}</option>
                                    })}
                                </select>
                            </label>
                        )
                    })}
                </div>

                <button>UPGRADE</button>
            </form>

        </div>
    )
}

export default EditPage