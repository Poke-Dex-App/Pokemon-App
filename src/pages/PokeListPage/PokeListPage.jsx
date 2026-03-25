import PokemonCard from "../../components/PokemonCard/PokemonCard"
import "./PokeListPage.css"


function PokeListPage(props) {
    return (
        <div className="pokemons-list-container">
            {props.pokemonsArr &&
                props.pokemonsArr.map((poke) => {
                    return (
                        <PokemonCard key={poke.id} poke={poke} />
                    )
                })}
        </div>
    )
}

export default PokeListPage