import "./SearchBar.css"

function SearchBar(props) {



    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()

        if (value === "") {
            props.setPokemons(props.pokemonsArr)
            return
        }
        const arrayFilteredBySearch = props.pokemonsArr.filter((poke) => {
            return poke.name.toLowerCase().includes(value)
        })
        



        props.setPokemons(arrayFilteredBySearch)
    }


    return (

        <div className="buscador">
            <input onChange={handleSearch} placeholder="Buscar por nombre" /><span>🔍</span>
        </div>
    )
}

export default SearchBar