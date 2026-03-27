import { useState } from "react"
import "./AddPokemonPage.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function AddPokemonPage({ pokemonsArr, getAllPokemons }) {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [abilities, setAbilities] = useState(["", ""])
    const [imagen, setImagen] = useState("")
    const [types, setTypes] = useState(["", ""])
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [weaknesses, setWeaknesses] = useState(["", "", ""])
    const [moves, setMoves] = useState(["", "", "", "", ""])

    const handleSubmit = (e) => {
        e.preventDefault()


        const pokeIds = pokemonsArr.map((pokeObj) => {
            return pokeObj.id;
        })

        const maxId = Math.max(...pokeIds)

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

        const cleanedAbilities = abilities.filter(ability => ability !== "");
        const cleanedTypes = types.filter(type => type !== "");
        const cleanedWeaknesses = weaknesses.filter(weaknes => weaknes !== "");
        const cleanedMoves = moves.filter(move => move !== "");

        const newPokemon = {
            name: name,
            description: description,
            abilities: cleanedAbilities,
            sprites: {
                front: imagen
            },
            types: cleanedTypes,
            weight: weight,
            height: height,
            stats: {
                base_stats: baseStats,
                max_stats: maxStats
            },
            weaknesses: cleanedWeaknesses,
            moves: cleanedMoves,
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

    const handleType = (value, i) => {
        const newTypes = [...types]
        newTypes[i] = value
        setTypes(newTypes)
    }

    const handleWeaknesses = (value, i) => {
        const newWeaknesses = [...weaknesses]
        newWeaknesses[i] = value
        setWeaknesses(newWeaknesses)
    }

    const handleAbilities = (value, i) => {
        const selectedAbility = unicAbilities.find(ability => ability.description === value);

        const newAbilities = [...abilities]
        newAbilities[i] = selectedAbility || ""

        setAbilities(newAbilities)
    }

    const handMoves = (value, i) => {
        const selectedMove = unicMoves.find(move => move.description === value);

        const newMoves = [...moves]
        newMoves[i] = selectedMove || ""

        setMoves(newMoves)
    }

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
                        maxLength={10}
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

                <div className="form-row">
                    <label>
                        Habilidad 1 (Obligatorio):
                        <select
                            name="abilities"
                            required
                            onChange={(e) => { handleAbilities(e.target.value, 0) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Habilidad--</option>
                            {unicAbilities.map((ability) => {
                                return <option value={ability.description}>{ability.description}</option>
                            })}
                        </select>
                    </label>

                    <label>
                        Habilidad 2:
                        <select
                            name="abilities"
                            onChange={(e) => { handleAbilities(e.target.value, 1) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Habilidad--</option>
                            <option value="">Ninguna</option>
                            {unicAbilities.map((ability) => {
                                return <option value={ability.description}>{ability.description}</option>
                            })}
                        </select>
                    </label>
                </div>

                <label>
                    Imagen:
                    <input
                        type="url"
                        name="imagen"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                    />
                </label>

                <div className="form-row">
                    <label>
                        Tipo 1 (Obligatorio):
                        <select
                            name="type"
                            required
                            onChange={(e) => { handleType(e.target.value, 0) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Tipo--</option>
                            {unicTypes.map((type) => {
                                return <option value={type}>{type}</option>
                            })}
                        </select>
                    </label>

                    <label>
                        Tipo 2:
                        <select
                            name="type"
                            onChange={(e) => { handleType(e.target.value, 1) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Tipo--</option>
                            <option value="">Ninguno</option>
                            {unicTypes.map((type) => {
                                return <option value={type}>{type}</option>
                            })}
                        </select>
                    </label>
                </div>

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

                <div className="form-row">
                    <label>
                        Debilidad 1 (Obligatorio):
                        <select
                            name="weaknesses"
                            required
                            onChange={(e) => { handleWeaknesses(e.target.value, 0) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Debilidades--</option>
                            {unicWeaknesses.map((weaknes) => {
                                return <option value={weaknes}>{weaknes}</option>
                            })}
                        </select>
                    </label>

                    <label>
                        Debilidad 2:
                        <select
                            name="weaknesses"
                            onChange={(e) => { handleWeaknesses(e.target.value, 1) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Debilidades--</option>
                            <option value="">Ninguna</option>
                            {unicWeaknesses.map((weaknes) => {
                                return <option value={weaknes}>{weaknes}</option>
                            })}
                        </select>
                    </label>

                    <label>
                        Debilidad 3:
                        <select
                            name="weaknesses"
                            onChange={(e) => { handleWeaknesses(e.target.value, 2) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Debilidades--</option>
                            <option value="">Ninguna</option>
                            {unicWeaknesses.map((weaknes) => {
                                return <option value={weaknes}>{weaknes}</option>
                            })}
                        </select>
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Movimiento 1:
                        <select
                            name="moves"
                            required
                            onChange={(e) => { handMoves(e.target.value, 0) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Movimientos--</option>
                            {unicMoves.map((move) => {
                                return <option value={move.description}>{move.description}</option>
                            })}
                        </select>
                    </label>

                    <label>
                        Movimiento 2:
                        <select
                            name="moves"
                            onChange={(e) => { handMoves(e.target.value, 1) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Movimientos--</option>
                            <option value="">Ninguno</option>
                            {unicMoves.map((move) => {
                                return <option value={move.description}>{move.description}</option>
                            })}
                        </select>
                    </label>

                    <label>
                        Movimiento 3:
                        <select
                            name="moves"
                            onChange={(e) => { handMoves(e.target.value, 2) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Movimientos--</option>
                            <option value="">Ninguno</option>
                            {unicMoves.map((move) => {
                                return <option value={move.description}>{move.description}</option>
                            })}
                        </select>
                    </label>

                    <label>
                        Movimiento 4:
                        <select
                            name="moves"
                            onChange={(e) => { handMoves(e.target.value, 3) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Movimientos--</option>
                            <option value="">Ninguno</option>
                            {unicMoves.map((move) => {
                                return <option value={move.description}>{move.description}</option>
                            })}
                        </select>
                    </label>

                    <label>
                        Movimiento 5:
                        <select
                            name="moves"
                            onChange={(e) => { handMoves(e.target.value, 4) }}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>--Movimientos--</option>
                            <option value="">Ninguno</option>
                            {unicMoves.map((move) => {
                                return <option value={move.description}>{move.description}</option>
                            })}
                        </select>
                    </label>
                </div>

                <button>CREATE</button>



            </form>

        </div>
    )
}

export default AddPokemonPage