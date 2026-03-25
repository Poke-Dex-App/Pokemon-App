import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import './PokeListDetails.css'

function PokeDetailsPage({getAllPokemons}) {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate()

    const [pokemon, setPokemon] = useState(null)
    const [mostar, setMostar] = useState(false)

    const { pokeId } = useParams()

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

    const kg = pokemon.weight / 10;
    const meters = pokemon.height / 10

    const onShow = () => {
        setMostar(true)
    }

    const onHide = () => {
        setMostar(false)
    }

    const playSound = () => {
        const audio = new Audio(pokemon.cry)

        audio.play().catch(error => {
            console.log("El navegador bloqueó el audio:", error);
        });
    }

    const onDelete = () => {
        axios
            .get(`${BASE_URL}.json?orderBy="id"&equalTo="${pokeId}"`)
            .then((response) => {
                const key = Object.keys(response.data)

                const firebaseKey = key[0]

                const deleteURL = `${BASE_URL}/${firebaseKey}.json`

                return axios.delete(deleteURL)
            })
            .then(() => {
                getAllPokemons()
                navigate("/")
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <h1>Poke Details</h1>
            <div id="poke-container">
                <div className="poke-img">
                    <img src={pokemon.sprites.front} />
                    <h2>{pokemon.name}</h2>
                    <button onClick={() => { onShow() }}>Ataques</button>
                </div>
                <div className="poke-info">
                    <p>{pokemon.description}</p>
                    <div className="specs">
                        <div>
                            <div>
                                <p><strong>Peso:</strong></p>
                                <p>{kg} Kg</p>
                            </div>
                            <div>
                                <p><strong>Altura:</strong></p>
                                <p>{meters} metros</p>
                            </div>
                            <div>
                                <button onClick={() => {playSound()}}>Grito</button>
                            </div>
                        </div>
                        <div className="poke-abilities">
                            <p><strong>Habilidades</strong></p>
                            {pokemon.abilities.map((ability, i) => {
                                return <h3 className="ability" key={i}>{ability.description}</h3>
                            })}
                        </div>
                    </div>
                    <h1>Tipos</h1>
                    <div className="types">
                        {pokemon.types.map((type, i) => {
                            return <p key={i} className={`type ${type}`}>{type}</p>
                        })}
                    </div>
                    <h1>Debilidades</h1>
                    <div className="types">
                        {pokemon.weaknesses.map((weaknes, i) => {
                            return <p key={i} className={`type ${weaknes}`}>{weaknes}</p>
                        })}
                    </div>
                    <h1>Estadísticas</h1>
                    {/* <div className="poke-stats">
                        <div>
                            <h2>Estadísticas Base</h2>
                            <p><strong>PS: </strong>{pokemon.stats.base_stats.hp}</p>
                            <p><strong>Ataque: </strong>{pokemon.stats.base_stats.attack}</p>
                            <p><strong>Defensa: </strong>{pokemon.stats.base_stats.defense}</p>
                            <p><strong>Ataque Esp.: </strong>{pokemon.stats.base_stats.special_attack}</p>
                            <p><strong>Desfensa Esp.: </strong>{pokemon.stats.base_stats.special_defense}</p>
                            <p><strong>Velocidad: </strong>{pokemon.stats.base_stats.speed}</p>
                        </div>
                        <div>
                            <h2>Estadistícas Máximas</h2>
                            <p><strong>PS: </strong>{pokemon.stats.max_stats.hp}</p>
                            <p><strong>Ataque: </strong>{pokemon.stats.max_stats.attack}</p>
                            <p><strong>Defensa: </strong>{pokemon.stats.max_stats.defense}</p>
                            <p><strong>Ataque Esp.: </strong>{pokemon.stats.max_stats.special_attack}</p>
                            <p><strong>Desfensa Esp.: </strong>{pokemon.stats.max_stats.special_defense}</p>
                            <p><strong>Velocidad: </strong>{pokemon.stats.max_stats.speed}</p>
                        </div>
                    </div> */}
                    {pokemon.prevolutions &&
                        <>
                            <h1>Prevoluciones</h1>
                            {pokemon.prevolutions.map((prevolution, i) => {
                                return <h3 key={i}>{prevolution}</h3>
                            })}
                        </>
                    }
                    {pokemon.evolutions &&
                        <>
                            <h1>Evoluciones</h1>
                            {pokemon.evolutions.map((evolution, i) => {
                                return <h3 key={i}>{evolution}</h3>
                            })}
                        </>
                    }
                    <h1>Sprites</h1>
                    <div className="sprites">
                        <img src={pokemon.sprites.front} />
                        <img src={pokemon.sprites.back} />
                        <img src={pokemon.sprites.front_shiny} />
                        <img src={pokemon.sprites.back_shiny} />
                    </div>
                </div>
                {mostar &&
                    <div id="moves">
                        <h1>Ataques</h1>
                        <table id="moves-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Nivel</th>
                                    <th>Tipo</th>
                                    <th>Poder</th>
                                    <th>PP</th>
                                    <th>Precision</th>
                                    <th>Efecto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pokemon.moves.map((move, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{move.description}</td>
                                            <td>{move.lvl_learned}</td>
                                            <td>{move.type}</td>
                                            <td>{move.power}</td>
                                            <td>{move.PP}</td>
                                            <td>{move.accuracy}</td>
                                            <td>{move.effect}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <button onClick={() => {onHide()}}>Cerrar</button>
                    </div>
                }
                <button onClick={onDelete} className="float-buttons" id="del">Borrar</button>
                <Link to={`/pokemons/edit/${pokeId}`}><button className="float-buttons" id="edit">Editar</button></Link>
            </div>
        </>
    )
}

export default PokeDetailsPage