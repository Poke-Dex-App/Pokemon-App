import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

function EditPage({pokemonsArr, getAllPokemons}) {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate()
    const {pokeId} = useParams()

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

    const handleAbilities = (e) => {
        const fullAbility = unicAbilities.find((ability) => ability.description === e.target.value)

        setPokemon({
            ...pokemon,
            abilities:[fullAbility]
        })
    }

    const handleMoves = (e) => {
        const fullMove = unicMoves.find((move) => move.description === e.target.value)
        
        setPokemon({
            ...pokemon,
            moves:[fullMove]
        })
    }

    const handleType = (e) => {
        const value = e.target.value
        
        setPokemon({
            ...pokemon,
            types:[value]
        })
    }

    const handleWeaknesses = (e) => {
        const value = e.target.value
        
        setPokemon({
            ...pokemon,
            weaknesses:[value]
        })
    }

    if (!pokemon) {
        return <p>Cargando datos del Pokémon...</p>;
    }

    return (
        <>
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

                <label>
                    Habilidades:
                    <select
                        name="abilities"
                        onChange={handleAbilities}
                    >
                        {unicAbilities.map((ability) => {
                            return <option value={ability.description}>{ability.description}</option>
                        })}
                    </select>
                </label>

                <label>
                    Tipo:
                    <select
                        name="type"
                        onChange={handleType}
                    >
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

                <label>
                    Debilidades:
                    <select
                        name="weaknesses"
                        onChange={handleWeaknesses}
                    >
                        {unicWeaknesses.map((weaknes) => {
                            return <option value={weaknes}>{weaknes}</option>
                        })}
                    </select>
                </label>

                <label>
                    Movimientos:
                    <select
                        name="moves"
                        onChange={handleMoves}
                    >
                        {unicMoves.map((move) => {
                            return <option value={move.description}>{move.description}</option>
                        })}
                    </select>
                </label>

                <button>UPGRADE</button>
            </form>

        </>
    )
}

export default EditPage