import PokemonCard from "../../components/PokemonCard/PokemonCard"
import "./PokelistPage.css"


function PokeListPage({props}) {

    return (
        <div className="pokemons-list-container">
            {props.pokemonsArr.map((poke) => {
                return (
                    <PokemonCard key={poke.id} poke={poke} />
                )
            })}
            {props.pokemonsArr.map((poke) => {
                return (
                    <PokemonCard key={poke.id} poke={poke} />
                )
            })}
            {props.pokemonsArr.map((poke) => {
                return (
                    <PokemonCard key={poke.id} poke={poke} />
                )
            })}
            {props.pokemonsArr.map((poke) => {
                return (
                    <PokemonCard key={poke.id} poke={poke} />
                )
            })}

        </div>
    )
}

export default PokeListPage