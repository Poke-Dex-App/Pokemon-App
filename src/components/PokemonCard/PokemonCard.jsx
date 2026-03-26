import { Link } from 'react-router-dom';
import './PokemonCard.css'

function PokemonCard (props) {

    const primType = props.poke.types[0];
    //console.log(props.poke)

    return(
        <Link to={`/pokemons/${props.poke.id}`} className='card'>
            <div className={`poke-card ${primType}`}>
                <p><strong>#{String(props.poke.id).padStart(3, "0")}</strong></p>
                <img src={props.poke.sprites.front}/>
                <h2> {props.poke.name.charAt(0).toUpperCase() + props.poke.name.slice(1)}</h2>
                <div className='types'>
                    {props.poke.types.map((type, i) => {
                        return <p className={`type-p ${type}`} key={i}>{type}</p>
                    })}
                </div>
            </div>
        </Link>
    )
}

export default PokemonCard