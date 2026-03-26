import { Link } from 'react-router-dom';
import './PokemonCard.css'
import { auth } from '../../../firebase/client';
import axios from 'axios';


function PokemonCard(props) {

    

    const addFav = () => {

        const user = auth.currentUser

        if (user) {
            user.getIdToken()
                .then((tokenId) => {
                    const baseURL = 'https://pokemon-app-ca105-default-rtdb.europe-west1.firebasedatabase.app'

                    const favURL = `${baseURL}/favourites/${user.uid}.json`;

                    axios
                        .get(favURL)
                        .then((pokemon) => {

                            const hasPokemon = pokemon.data;
                            const pokemonData = hasPokemon ? pokemon.data : {};

                            const data = Object.keys(pokemonData).map((id) => ({
                                    id,
                                    ...pokemon.data[id],
                                }));


                            const getData = data.find((poke) => poke.id === props.poke.id)

                            if(getData){
                                axios
                                    .delete(`${baseURL}/favourites/${user.uid}/${props.poke.id}.json?auth=${tokenId}`)
                                    .then(() => {
                                        props.onRemove(props.poke.id)
                                    })
                            } else {
                                axios.put(`${baseURL}/favourites/${user.uid}/${props.poke.id}.json?auth=${tokenId}`, props.poke)
                            }
                            
                        })
                        .catch((error) => console.log(error))
                })

        }
    }

    const favFunction = (e) => {
        e.preventDefault()
        e.stopPropagation()

        addFav()
    }

    const primType = props.poke.types[0];
    //console.log(props.poke)

    return (
        <>
            <Link to={`/pokemons/${props.poke.id}`} className='card'>
                <div className={`poke-card ${primType}`}>
                    <p><strong>#{String(props.poke.id).padStart(3, "0")}</strong></p>
                    <img src={props.poke.sprites.front} />
                    <h2> {props.poke.name.charAt(0).toUpperCase() + props.poke.name.slice(1)}</h2>
                    <div className='types'>
                        {props.poke.types.map((type, i) => {
                            return <p className={`type-p ${type}`} key={i}>{type}</p>
                        })}
                    </div>
                    <button onClick={favFunction}>Fav</button>
                </div>
            </Link>
        </>
    )
}

export default PokemonCard