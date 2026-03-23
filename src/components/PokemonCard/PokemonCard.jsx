import { Link } from 'react-router-dom';
import './PokemonCard.css'

function PokemonCard (props) {

    const primType = props.poke.types[0];
    //console.log(props.poke)

    return(
        <Link to={`/pokemons/${props.poke.id}`}>
            <div className={`poke-card ${primType}`}>
                <p>{props.poke.latest_index}</p>
                <img src={props.poke.sprites.front}/>
                <h2>{props.poke.name}</h2>
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