import { useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard"
import SearchBar from "../../components/SearchBar/SearchBar"
import "./PokeListPage.css"
import Login from "../../components/Login/Login";



function PokeListPage(props) {

    const [visibleCount, setVisibleCount] = useState(12)


    return (

        <>
            <Login></Login>
            <h1>POKEMON LIST {props.pokemonsArr.length}</h1>
            <SearchBar allPokemonsArr={props.allPokemonsArr} setPokemons={props.setPokemons} />
            <div className="buttons-order">
                <button onClick={props.normalOrder}>Orden normal</button>
                <button onClick={props.reverseOrder}>Invertir Orden</button>
                <button onClick={props.randomOrder}>Orden Aleatorio</button>
            </div>
            <div className="pokemons-list-container">

                {props.pokemonsArr &&
                    props.pokemonsArr
                        .slice(0, visibleCount)
                        .map((poke) => (
                            <PokemonCard key={poke.id} poke={poke} />
                        ))
                }
            </div>

            <div className="buttons-show">

                {visibleCount < props.pokemonsArr.length && (
                    <button onClick={() => setVisibleCount(visibleCount + 12)}>
                        Mostrar más
                    </button>

                )}
                {visibleCount > 12 && (
                    <button onClick={() => setVisibleCount(visibleCount - 12)}>
                        Mostrar menos
                    </button>
                )}
            </div>


        </>
    )
}

export default PokeListPage