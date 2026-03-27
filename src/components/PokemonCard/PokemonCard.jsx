import { Link } from 'react-router-dom';
import './PokemonCard.css'
import { auth } from '../../../firebase/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';


function PokemonCard(props) {

    const [user, setUser] = useState(null);
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;

        user.getIdToken().then((tokenId) => {
            const url = `https://pokemon-app-ca105-default-rtdb.europe-west1.firebasedatabase.app/favourites/${user.uid}/${props.poke.id}.json?auth=${tokenId}`;

            axios.get(url).then((res) => {
                setIsFav(!!res.data);
            });
        });
    }, [user, props.poke.id]);


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

                            if (getData) {
                                axios
                                    .delete(`${baseURL}/favourites/${user.uid}/${props.poke.id}.json?auth=${tokenId}`)
                                    .then(() => {
                                        setIsFav(false);
                                        props.onRemove(props.poke.id)
                                    })
                            } else {
                                axios
                                    .put(`${baseURL}/favourites/${user.uid}/${props.poke.id}.json?auth=${tokenId}`, props.poke)
                                    .then(() => {
                                        setIsFav(true);
                                    })

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
                    {user && (
                        <button className='button-fav' onClick={favFunction}>
                            {isFav ? "♥" : "♡"}
                        </button>
                    )}
                </div>
            </Link>
        </>
    )
}

export default PokemonCard