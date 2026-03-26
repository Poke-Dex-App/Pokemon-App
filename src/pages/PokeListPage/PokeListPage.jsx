import PokemonCard from "../../components/PokemonCard/PokemonCard"
import SearchBar from "../../components/SearchBar/SearchBar"
import "./PokeListPage.css"


function PokeListPage(props) {
    return (

        <>
        
        <h1>POKEMON LIST {props.pokemonsArr.length}</h1>
        <SearchBar allPokemonsArr={props.allPokemonsArr} setPokemons={props.setPokemons}/>
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