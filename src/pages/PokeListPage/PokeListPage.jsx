import PokemonCard from "../../components/PokemonCard/PokemonCard"
import SearchBar from "../../components/SearchBar/SearchBar"
import "./PokeListPage.css"


function PokeListPage(props) {
    return (

        <>

            <h1>POKEMON LIST {props.pokemonsArr.length}</h1>
            <SearchBar allPokemonsArr={props.allPokemonsArr} setPokemons={props.setPokemons} />
            <div>
                <button onClick={props.normalOrder}>Orden normal</button>
                <button onClick={props.reverseOrder}>Invertir</button>
                <button onClick={props.randomOrder}>Aleatorio</button>
            </div>
            <div className="pokemons-list-container">
                {props.pokemonsArr &&
                    props.pokemonsArr.map((poke) => {
                        return (
                            <PokemonCard key={poke.id} poke={poke} />
                        )
                    })}
            </div>

        </>
    )
}

export default PokeListPage