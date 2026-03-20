import './PokemonCard.css'

function PokemonCard (props) {

    const primType = props.poke.types[0];

    return(
        <div className={`poke-card ${primType}`}>
            <p>{props.poke.latest_index}</p>
            <img src={props.poke.sprites.front}/>
            <h2>{props.poke.name}</h2>
            <div className='types'>
                {props.poke.types.map((type) => {
                    return <p className={`type-p ${type}`} key={type}>{type}</p>
                })}
            </div>
        </div>
    )
}

export default PokemonCard