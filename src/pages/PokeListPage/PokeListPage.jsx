import PokemonCard from "../../components/PokemonCard/PokemonCard"
import "./PokelistPage.css"


function PokeListPage(props) {
 
    const pokemonsArray = Object.keys(props.pokemonsArr).map((id) => ({
    id,
    ...props.pokemonsArr[id],
  }));


    return (
        <div className="pokemons-list-container">
            {  pokemonsArray && 
            
            pokemonsArray.map((poke) => {
                return (
                    <PokemonCard key={poke.id} poke={poke} />
                )
            })}
        </div>
    )
}

export default PokeListPage