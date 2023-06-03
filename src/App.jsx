import { useState } from "react";
import Axios from "axios";
import "./App.css";

const App = () => {
  const [pokemonName, setPokemonName] = useState(""); //seteara el nombre del pokemon cuando cambie el valor del input
  const [pokemonChosen, setPokemonChosen] = useState(false); //es el estado que indica si hay seteado algun pokemon, cambia a true cuando se ejecuta
  const [pokemon, setPokemon] = useState({
    // esto define la informacion del JSON parta setearla
    name: "", //se inicializan vacios para rellenarlos con los datos que traiga
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      //el enlace con la api
      (res) => {
        setPokemon({
          //estos son los datos que le decimos que recoja de la api
          name: pokemonName,
          number: res.data.id, //le decimos que dentro del JSON busque el id
          species: res.data.species.name,
          image: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
          type: res.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokédex</h1>
        <input
          type="text"
          onChange={(event) => {
            // onChange llama a la funcion cuando se cambia el valor
            setPokemonName(event.target.value); //recoje el nombre de los pokemon a traves del evento
          }}
          value={pokemonName.toLowerCase()} //convierte la cadena de texto a minusculas y devuelve su valor
        />
        <div>
          {pokemonName && ( //
            <button onClick={searchPokemon}>Search Pokémon</button> //oculta el boton del buscador cuando el input esta vacio
          )}
        </div>
      </div>
      <div className="DisplaySection"></div>
      {!pokemonChosen ? ( // si no hay nada en el input nos imprime el h1
        <h1> Elige tu pokemon</h1>
      ) : (
        // si hay un nombre en el input inprime el div
        <div className="pokemonContainer">
          <h1>{pokemon.name}</h1>
          <img src={pokemon.image} alt={pokemon.name} />
          <h3>Number: #{pokemon.number}</h3>
          <h3>Species: {pokemon.species}</h3>
          <h3>Type: {pokemon.type}</h3>
          <h4>Hp: {pokemon.hp}</h4>
          <h4>Attack: {pokemon.attack}</h4>
          <h4>Defense: {pokemon.defense}</h4>
          <h4>Speed: {pokemon.speed}</h4>
        </div>
      )}
    </div>
  );
};

export default App;
