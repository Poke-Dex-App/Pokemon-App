import axios from "axios"
import { auth } from "../../../firebase/client"
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react"
import PokemonCard from "../../components/PokemonCard/PokemonCard"

function FavouritesPage() {

    const [pokemons, setPokemons] = useState(null)

    useEffect(() => {
        // Escuchamos cuando el usuario entra o sale
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const baseURL = 'https://pokemon-app-ca105-default-rtdb.europe-west1.firebasedatabase.app';
                
                user.getIdToken().then((idToken) => {
                    // Importante: añadir el token ?auth= para que Firebase te deje leer
                    const favURL = `${baseURL}/favourites/${user.uid}.json?auth=${idToken}`;

                    axios.get(favURL)
                        .then((response) => {
                            if (response.data) {
                                const data = Object.keys(response.data).map((key) => ({
                                    firebaseId: key,
                                    ...response.data[key],
                                }));
                                setPokemons(data);
                            } else {
                                setPokemons([]);
                            }
                        })
                        .catch((error) => console.log("Error en Axios:", error));
                });
            } else {
                setPokemons([]);
            }
        });

        // Limpieza al desmontar el componente
        return () => unsubscribe();
    }, []);

    if(!pokemons){
        return <p>Cargando</p>
    }

    return (
        <>
            <h1>Favourites Page</h1>
            {pokemons.map((poke) => {
                return(
                    <PokemonCard 
                        key={poke.id}
                        poke={poke}
                        onRemove={(id) => setPokemons(prev => prev.filter(item => item.id !== id))}
                    />
                )
            })}
        </>
    )
}

export default FavouritesPage